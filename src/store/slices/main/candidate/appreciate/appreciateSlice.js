import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = process.env.REACT_APP_API;

const appreciateSlice = createSlice({
  name: "appreciate",
  initialState: {
    appreciateList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addAppreciate.fulfilled, (state, action) => {
      state.status = "success";
      state.appreciateList = [...state.appreciateList, action.payload];
    });
    builder
      .addCase(getAppreciateByCompany.fulfilled, (state, { payload }) => {
        state.appreciateList = payload?.contents;
      })
      .addCase(updateAppreciate.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "success";
        } else {
          state.status = "fail";
        }
      });
  },
});

export const getAppreciateByCompany = createAsyncThunk(
  "appreciate/getAppreciateByCompany",
  async (idCompany = 1) => {
    const user = JSON.parse(sessionStorage.getItem("userPresent"))?.token ||
   JSON.parse(localStorage.getItem("userPresent"))?.token;
    const header = {
      headers: {
        Authorization: "Bearer " + user,
      },
    };
    return axios
      .get(
        `${baseURL}/api/r2s/rate/company/${idCompany}/?no=0&limit=10`,
        header
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const addAppreciate = createAsyncThunk(
  "appreciate/addAppreciate",
  async (data) => {
    const user = JSON.parse(sessionStorage.getItem("userPresent"))?.token ||
   JSON.parse(localStorage.getItem("userPresent"))?.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user,
    };
    const res = await axios
      .post(`${baseURL}/api/r2s/rate`, data, {
        headers : headers
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response.data;
      });
    return res;
  }
);

export const updateAppreciate = createAsyncThunk(
  "appreciate/updateAppreciate",
  async (data) => {
    const user = JSON.parse(sessionStorage.getItem("userPresent"))?.token ||
   JSON.parse(localStorage.getItem("userPresent"))?.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user,
    };

    const res = await axios
      .put(`${baseURL}/api/r2s/rate/${data.id}`, data.avaluateData, {
        headers: headers,
      })

      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response.data;
      });
    return res;
  }
);

export const deleteAppreciate = createAsyncThunk(
  "appreciate/deleteAppreciate",
  async (id) => {
    const user = JSON.parse(sessionStorage.getItem("userPresent"))?.token ||
   JSON.parse(localStorage.getItem("userPresent"))?.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user,
    };

    const res = await axios
      .delete(
        `${baseURL}/api/r2s/rate/${id}`,

        {
          headers: headers,
        }
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response.data;
      });
    return res;
  }
);

// export const { addJob, removeJob } = markJobSlice.actions;
export default appreciateSlice;
