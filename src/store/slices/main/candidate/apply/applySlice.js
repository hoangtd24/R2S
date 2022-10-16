import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "src/config/api/apiConfig";

const baseURL = process.env.REACT_APP_API;

const applySlice = createSlice({
  name: "apply_candidate",
  initialState: {
    applyList: [],
    applyListHavePage: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addApply.fulfilled, (state, action) => {
      state.status = "success";
      // state.careListCandidate = action.payload;
    });
    builder.addCase(
      getApplyListByIdCandidate.fulfilled,
      (state, { payload }) => {
        state.applyList = payload.contents;
        state.applyListHavePage = payload;
      }
    );
    builder.addCase(
      getJobCandidateAppliedByNameAndLocation.fulfilled,
      (state, { payload }) => {
        state.applyList = payload.contents;
      }
    );
    builder.addCase(deleteApply.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
    });
  },
});

export const getApplyListByIdCandidate = createAsyncThunk(
  "apply_candidate/getApplyListByIdCandidate",
  async (data) => {
    return axios
      .get(`${baseURL}/api/applylist/candidate/${data.idCandidate}`, {
        params: data.page,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
export const getJobCandidateAppliedByNameAndLocation = createAsyncThunk(
  "apply_candidate/getJobCandidateAppliedByNameAndLocation",
  async (dataSearch) => {
    return axios
      .get(
        `${baseURL}/api/r2s/job/search/candidate-apply/${dataSearch.idCandidate}`,
        {
          params: dataSearch.valueSearch,
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const addApply = createAsyncThunk(
  "apply_candidate/addApply",
  async (data) => {
    const res = await axios
      .post(`${baseURL}/api/applylist`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

export const deleteApply = createAsyncThunk(
  "apply_candidate/deleteApply",
  async (id) => {
    const res = await api
      .delete(`${baseURL}/api/applylist/${id}`)
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
export default applySlice;
