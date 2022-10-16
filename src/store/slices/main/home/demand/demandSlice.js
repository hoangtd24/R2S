import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API;

const demandSlice = createSlice({
  name: "demand",
  initialState: {
    demandList: [],
    demandListUniversity: [],
    demandListUniversityActive: [],
    status: "idle",
    indexPartnerCardActive: 0,
    idPartnerCardActive: 0,
    demandDetail: {},
    demandListByPartnerId: [],
    closeEditDemand: false,
    totalPagesofDemandList: 0,
  },
  reducers: {
    updateIdPartnerCardActive: (state, { payload }) => {
      state.idPartnerCardActive = payload;
    },
    updateIndexPartnerCardActive: (state, { payload }) => {
      state.indexPartnerCardActive = payload;
      state.demandDetail = state?.demandList[payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDemandListByUniId.fulfilled, (state, { payload }) => {
      state.demandListUniversity = payload;
      state.demandListUniversityActive = payload?.contents;
    });
    builder
      .addCase(addDemand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDemand.fulfilled, (state, { payload }) => {
        if(payload.httpCode === 500) {
          state.status = payload.message
          toast.error("Đăng danh sách thực tập thất bại!");
          toast.error(`Lỗi: ${payload.message}`);
        } else { 
          
          state.status = "success"
          state.demandListUniversityActive.unshift(payload);
          toast.success("Đăng danh sách thực tập thành công!");
        }

      });
    builder
      .addCase(getDemandList.pending, (state, { payload }) => {
        state.status = "loading";
      })
      .addCase(getDemandList.fulfilled, (state, { payload }) => {
        state.demandList = payload.contents;
        state.totalPagesofDemandList = payload;
      });
    builder
      .addCase(getDemandByName.pending, (state, { payload }) => {
        state.status = "loading";
      })
      .addCase(getDemandByName.fulfilled, (state, { payload }) => {
        state.demandList = payload.demandList;
        state.totalPagesofDemandList = payload?.totalPage;
        if (payload.demandList?.length > 0) {
          state.demandDetail = payload.demandList[0];
        } else {
        }
      });
    builder
      .addCase(getDemandById.pending, (state, { payload }) => {
        state.status = "loading";
      })
      .addCase(getDemandById.fulfilled, (state, { payload }) => {
        state.demandDetail = payload;
      });
    builder
      .addCase(updateDemand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDemand.fulfilled, (state, { payload }) => {
        state.demandListUniversityActive = state.demandListUniversityActive.map(
          (demand) => {
            if (demand.id === payload.id) {
              return payload;
            }
            return demand;
          }
        );
        toast.success("Cập nhật danh sách thực tập thành công!");
        state.closeEditDemand = true;
      });
  },
});

export const addDemand = createAsyncThunk("demand/addDemand", async (data) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + data[1].token,
    },
  };
  return axios
    .post(`${baseURL}/api/r2s/partner/demand`, data[0], axiosConfig)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

export const updateDemand = createAsyncThunk(
  "demand/updateDemand",
  async (data) => {
    const { idDemand, demandData } = data;
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return axios
      .put(
        `${baseURL}/api/r2s/partner/demand/${idDemand}`,
        demandData,
        axiosConfig
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const getDemandListByUniId = createAsyncThunk(
  "demand/getDemandListByUniId",
  async ({ uniId, currentPage, limit }) => {
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return await axios
      .get(
        `${baseURL}/api/demand/filter-university/${uniId}?no=${
          currentPage - 1
        }&limit=${limit}`,
        axiosConfig
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }
);

export const getDemandById = createAsyncThunk(
  "demand/getDemandById",
  async (id) => {
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return await axios
      .get(`${baseURL}/api/demand/${id}`, axiosConfig)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }
);

export const getDemandList = createAsyncThunk(
  "demand/getDemandList",
  async ({ currentPage, limit }) => {
    return await axios
      .get(`${baseURL}/api/demand?no=${currentPage - 1}&limit=${limit}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        return err.response.data;
      });
  }
);

export const getDemandByName = createAsyncThunk(
  "demand/getDemandByName",
  async (dataSearch) => {
    return await axios
      .get(`${baseURL}/api/r2s/partner/demand/search`, { params: dataSearch })
      .then((response) => {
        return {
          demandList: response.data.contents,
          totalPage: response.data.totalPages,
        };
      })
      .catch((err) => {
        return err.response.data;
      });
  }
);
export const { updateIndexPartnerCardActive } = demandSlice.actions;
export default demandSlice;
