import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import notificationSlice from "../../notifications/notificationSlice";

const baseURL = process.env.REACT_APP_API;

const demandSlice = createSlice({
  name: "adminDemand",
  initialState: {
    demandList: [],
    jobListName: [],
    indexCardActive: 0,
    jobDetail: {},
    jobPosition: [],
    status: "fail",
    demand: {},
    totalPages: 0,
    totalItems: 0,
    onSearch: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addDemand.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addDemand.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.demand = payload;
    });
    builder.addCase(getAdminListDemand.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAdminListDemand.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.demandList = payload.contents;
      state.totalPages = payload.totalPages;
      state.totalItems = payload.totalItems;
    });
    builder.addCase(searchDemand.fulfilled, (state, { payload }) => {
      state.demandList = payload.data.contents;
      state.totalPages = payload.data.totalPages;
      state.totalItems = payload.data.totalItems;
      state.onSearch = true;
    });
  },
});

export const addDemand = createAsyncThunk("demand/addDemand", async (data) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(`${baseURL}/api/r2s/partner/demand`, data, axiosConfig)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

/**
 * get demand list
 * @param args[]
 * args[0]: number of current page
 * args[1]: size current item
 * @returns demand list
 */
export const getAdminListDemand = createAsyncThunk(
  "adminDemand/getAdminDemandList",
  async (args) => {
    const res = await axios
      .get(`${baseURL}/api/demand?no=${args[0] - 1}&limit=${args[1]}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
    return res;
  }
);

export const searchDemand = createAsyncThunk("user/searchDemand", async (args) => {
  const header = {
    headers: {
      Authorization: "Bearer " + args[3],
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await axios
    .get(`${baseURL}/api/r2s/partner/demand/search/?name=${args[0]}&no=${args[1] - 1}&limit=${args[2]}`, header)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response.data;
    });
  return res;
})


export const updateDemandStatus = createAsyncThunk(
  "demand/updatDemandStatus",
  async (args, thunkAPI) => {
    const header = {
      headers: {
        Authorization: "Bearer " + args[1],
        "Content-Type": "application/json",
      },
    };
    const { university, uniId } = args[0];
    return await axios
      .put(`${baseURL}/api/r2s/admin/university/status/${uniId}`, university, header)
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Cập nhật nhu cầu thành công")
        );
      })
      .catch((error) => {
        console.log("error", error)
        return error.response.data;
      });
  }
);


export const { updateIdJobActive, updateIndexCardActive } = demandSlice.actions;
export default demandSlice;
