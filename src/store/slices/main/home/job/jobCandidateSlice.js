import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = process.env.REACT_APP_API;

const jobCandidateSlice = createSlice({
  name: "jobCandidateSlice",
  initialState: {
    jobApplyList: [],
    jobApplyListHavePage: [],
    jobCare: [],
    jobCareHavePage: [],
    allJobCare: [],
    allJobApply: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getJobApplyListByCandidate.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.jobApplyList = payload.contents;
          state.jobApplyListHavePage = payload;
        }
      }
    );
    builder.addCase(getJobCareByCandidate.fulfilled, (state, { payload }) => {
      state.jobCare = payload.contents;
      state.jobCareHavePage = payload;
    });
    builder.addCase(addJobCare.fulfilled, (state, action) => {
      state.jobCare = [...state.jobCare, action.payload];
    });
    builder.addCase(getAllJobCare.fulfilled, (state, { payload }) => {
      state.allJobCare = payload.contents;
    });
    builder.addCase(getAllJobApply.fulfilled, (state, { payload }) => {
      state.allJobApply = payload.contents;
    });
  },
});

export const getJobApplyListByCandidate = createAsyncThunk(
  "jobCadidateSlice/getJobApplyListByCandidate",
  async (args) => {
    const header = {
      headers: {
        Authorization: "Bearer " + args?.token,
      },
    };
    if (args.user.user.role.name.includes("Role_Candidate")) {
      return await axios
        .get(`${BASEURL}/api/r2s/candidate/user/${args.user.user.id}`, header)
        .then(async (response) => {
          try {
            const response_1 = await axios.get(
              `${BASEURL}/api/applylist/candidate/${response.data.id}?no=${args?.page?.no}&limit=${args?.page?.limit}`
            );
            return response_1.data;
          } catch (error) {
            return error.response.data;
          }
        })
        .catch((error) => {
          return error.response.data;
        });
    }
  }
);
export const getJobCareByCandidate = createAsyncThunk(
  "jobCadidateSlice/getJobCareByCandidate",
  async (args) => {
    const header = {
      headers: {
        Authorization: "Bearer " + args.token,
      },
    };
    if (args.user.user.role.name.includes("Role_Candidate")) {
      return await axios
        .get(
          `${BASEURL}/api/r2s/carelist/user/${args.user.user.username}?no=${args.page.no}&limit=${args.page.limit}`,
          header
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
    }
  }
);
export const addJobCare = createAsyncThunk(
  "jobCadidateSlice/adddCareJob",
  async (args) => {
    return await axios
      .post(`${BASEURL}/api/r2s/carelist`, args[0], {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + args[1],
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
export const deleteJobCare = createAsyncThunk(
  "jobCadidateSlice/deleteJobCare",
  async (args) => {
    console.log(args);
    const header = {
      headers: {
        Authorization: "Bearer " + args[0].token,
      },
    };
    return await axios
      .delete(`${BASEURL}/api/r2s/carelist/${args[0].id}`, header)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
export const getAllJobCare = createAsyncThunk(
  "jobCandidateSlice/getAllJobCare",
  async (args) => {
    const header = {
      headers: {
        Authorization: "Bearer " + args.token,
      },
    };
    return await axios
      .get(
        `${BASEURL}/api/r2s/carelist/user/${args.user.user.username}?no=${args.page.no}&limit=${args.page.limit}`,
        header
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("err 1000 Care", err);
      });
  }
);
export const getAllJobApply = createAsyncThunk(
  "jobCandidateSlice/getAllJobApply",
  async (args) => {
    console.log(args);
    const header = {
      headers: {
        Authorization: "Bearer " + args.token,
      },
    };
    return await axios
      .get(`${BASEURL}/api/r2s/candidate/user/${args.user.user.id}`, header)
      .then(async (response) => {
        try {
          const response_1 = await axios.get(
            `${BASEURL}/api/applylist/candidate/${response.data.id}?no=${args?.page?.no}&limit=${args?.page?.limit}`
          );
          return response_1.data;
        } catch (error) {
          return error.response.data;
        }
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
export default jobCandidateSlice;
