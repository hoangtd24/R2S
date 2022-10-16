import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import notificationSlice from "../../notifications/notificationSlice";

const baseURL = process.env.REACT_APP_API;

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyList: [],
    companyDetail: {},
    companyDetail1: {},
    error: [],
    totalPages: 0,
    totalItems: 0,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanyList.fulfilled, (state, { payload }) => {
      state.companyList = payload.contents;
    });
    builder.addCase(addCompany.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
    });
    builder.addCase(getCompanyDetail.fulfilled, (state, { payload }) => {
      state.companyDetail = payload;
    });
    builder.addCase(updateCompanyInfo.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
    });
    builder.addCase(searchCompany.fulfilled, (state, { payload }) => {
      state.companyList = payload.data.contents;
      state.totalPages = payload.data.totalPages;
      state.totalItems = payload.data.totalItems;
    });
  },
});

export default companySlice;

/**
 * get company list
 * @param args
 * args[0]: number of current page
 * args[1]: size current item
 * @returns company list
 */
export const getCompanyList = createAsyncThunk(
  "company/getCompanyList",
  async (args) => {
    const header = {
      headers: {
        Authorization: "Bearer " + args[2],
        "Content-Type": "multipart/form-data",
      },
    };
    return await axios
      .get(`${baseURL}/api/r2s/company?no=${args[0] - 1}&limit=${args[1]}`, header)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

/**
 * Add company
 * @param data
 * @returns notification
 */

export const addCompany = createAsyncThunk(
  "company/addCompany",
  async (data, thunkAPI) => {
    const { companyData, reset } = data;
    return axios
      .post(`${baseURL}/api/company`, companyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Thêm công ty thành công")
        );
        reset({
          description: "",
          email: "",
          // logo: image,
          name: "",
          phone: "",
          tax: "",
          website: "",
        });
        // return response.data;
      })
      .catch((error) => {
        thunkAPI.dispatch(
          notificationSlice.actions.errorMess("Thêm công ty khoong thành công")
        );
        return error.response.data;
      });
  }
);

/**
 * get company detail by comId
 * @params comId
 * @return company detail
 */
export const getCompanyDetail = createAsyncThunk(
  "company/getCompanyDetail",
  async (comId) => {
    return await axios
      .get(`${baseURL}/api/company/${comId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

/**
 * @params comId updateData
 * @return
 * success => notification
 * error => error.response.data
 */
export const updateCompanyInfo = createAsyncThunk(
  "company/updateCompanyInfo",
  async (updateData, thunkAPI) => {
    const { companyData, setIsEdit, comid } = updateData;
    return axios
      .put(`${baseURL}/api/company/${comid}`, companyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Cập nhật công ty thành công")
        );
        if (setIsEdit) {
          setIsEdit(false);
        }
      })
      .catch((error) => {
        thunkAPI.dispatch(
          notificationSlice.actions.errorMess(
            "Cập nhật công ty Không thành công"
          )
        );
        return error.response.data;
      });
  }
);

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (id, thunkAPI) => {
    return await axios
      .delete(`${baseURL}/api/company/${id}`)
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Xóa công ty thành công.")
        );
        return response.data;
      })
      .catch((error) => {
        thunkAPI.dispatch(
          notificationSlice.actions.errorMess("Xóa công ty không thành công.")
        );
        return error.response.data;
      });
  }
);

export const searchCompany = createAsyncThunk("company/searchCompany", async (args) => {
  const header = {
    headers: {
      Authorization: "Bearer " + args[3],
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await axios
    .get(`${baseURL}/api/r2s/admin/company/search?name=${args[0]}&no=${args[1] - 1}&limit=${args[2]}`, header)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response.data;
    });
  return res;
})