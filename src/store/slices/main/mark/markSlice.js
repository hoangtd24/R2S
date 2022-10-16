import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_API;

const markJobSlice = createSlice({
  name: "mark",
  initialState: {
    status: "",
    careListCandidate: [],
    careListOfPrivate: [],
    careListOfPrivateHavePages: [],
    careJob: {},
  },
  extraReducers: (builder) => {
    builder.addCase(createMark.fulfilled, (state, action) => {
      state.status = "success";
      state.careListCandidate = [...state.careListCandidate, action.payload];
    });
    builder.addCase(getMark.fulfilled, (state, { payload }) => {
      state.careListCandidate = payload;
    });
    builder.addCase(getMarkByUser.fulfilled, (state, { payload }) => {
      state.careListOfPrivate = payload?.contents;
      state.careListOfPrivateHavePages = payload;
    });
    builder.addCase(getMarkByUserAndJob.fulfilled, (state, { payload }) => {
      state.careJob = payload;
    });
    builder.addCase(getJobByNameAndLocation.fulfilled, (state, { payload }) => {
      state.careListOfPrivate = payload?.contents;
    });
    builder.addCase(
      getJobCandidateCaredByNameAndLocation.fulfilled,
      (state, { payload }) => {
        state.careListOfPrivate = payload?.contents;
      }
    );
    builder.addCase(deleteMark.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
    });
  },
});

export const getMark = createAsyncThunk("mark/getMark", async () => {
  const user =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));
  const header = {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };
  return axios
    .get(`${baseURL}/api/r2s/carelist?no=0&limit=10`, header)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

export const getMarkByUser = createAsyncThunk(
  "mark/getMarkByUser",
  async (data) => {
    const header = {
      headers: {
        Authorization: "Bearer " + data[1],
      },
    };
    return await axios
      .get(
        `${baseURL}/api/r2s/carelist/user/${data[0].userName}?no=0&limit=20`,
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

export const getJobByNameAndLocation = createAsyncThunk(
  "job/getJobByNameAndLocation",
  async (dataSearch) => {
    return axios
      .get(`${baseURL}/api/r2s/job/search`, {
        params: dataSearch,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const getMarkByUserAndJob = createAsyncThunk(
  "mark/getMarkByUserAndJob",
  async (data) => {
    const user =
      JSON.parse(sessionStorage.getItem("userPresent")) ||
      JSON.parse(localStorage.getItem("userPresent"));
    const { userName, idJob, page } = data;
    const header = {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    };
    return axios
      .get(
        `${baseURL}/api/r2s/carelist/user/${userName}/job/${idJob}`,
        header,
        {
          params: page,
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
export const getJobCandidateCaredByNameAndLocation = createAsyncThunk(
  "mark/getJobCandidateCaredByNameAndLocation",
  async (dataSearch) => {
    return axios
      .get(
        `${baseURL}/api/r2s/job/search/candidate-care/${dataSearch.idCandidate}`,
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

export const createMark = createAsyncThunk("mark/createMark", async (data) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + data[1].token,
  };
  const res = await axios
    .post(`${baseURL}/api/r2s/carelist`, data[0], {
      headers: headers,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
});

export const deleteMark = createAsyncThunk("mark/deleteMark", async (data) => {
  const user =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));
  const header = {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };
  const res = await axios
    .delete(`${baseURL}/api/r2s/carelist/${data}`, header)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
});

// export const { addJob, removeJob } = markJobSlice.actions;
export default markJobSlice;
