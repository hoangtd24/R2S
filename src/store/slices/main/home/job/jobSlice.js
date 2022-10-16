import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API;

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobList: [],
    jobListCompany: [],
    jobListName: [],
    jobFilter: [],
    jobListHavePages: [],
    jobListActived: [],
    jobListDisabled: [],
    jobDetailById: {},
    indexCardActive: 0,
    idJobActive: 0,
    jobDetail: {},
    jobPosition: [],
    status: "fail",
    error: "",
    listCandidatesApplied: [],
    totalPages: 0,
    totalItemActive: 0,
    totalItemDisable: 0,
  },
  reducers: {
    updateIdJobActive: (state, action) => {
      state.idJobActive = action.payload;
    },
    updateIndexCardActive: (state, action) => {
      state.indexCardActive = action.payload;
      state.jobDetail = state?.jobFilter[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobList.fulfilled, (state, { payload }) => {
      state.jobList = payload.contents;
    });
    builder.addCase(getJobByCompany.fulfilled, (state, { payload }) => {
      state.jobListCompany = payload;
    });
    builder.addCase(
      getActivedJobListByUserId.fulfilled,
      (state, { payload }) => {
        if (payload.httpCode === 404) {
          state.error = 404;
        } else {
          state.jobListActived = payload.contents;
          state.status = "fail";
          state.totalPages = payload.totalPages;
          state.totalItemActive = payload.totalItems;
        }
      }
    );
    builder.addCase(
      getDisabledJobListByUserId.fulfilled,
      (state, { payload }) => {
        if (payload.httpCode === 404) {
          state.error = 404;
        } else {
          state.jobListDisabled = payload.contents;
          state.status = "fail";
          state.totalPages = payload.totalPages;
          state.totalItemDisable = payload.totalItems
        }
      }
    );
    builder.addCase(getJobByName.fulfilled, (state, { payload }) => {
      state.jobListName = payload;
      if (payload.contents.length > 0) {
        state.jobDetail = payload.contents[0];
      } else {
      }
    });
    builder.addCase(getJobByNameAndLocation.fulfilled, (state, { payload }) => {
      state.jobListName = payload?.contents;
      state.jobListHavePages = payload;
      if (payload?.contents?.length > 0) {
        state.jobDetail = payload.contents[0];
      } else {
      }
    });
    builder.addCase(getJobById.fulfilled, (state, { payload }) => {
      state.jobActive = payload;
      state.jobDetailById = payload;
    });
    builder.addCase(getJobPositionList.fulfilled, (state, { payload }) => {
      state.jobPosition = payload;
    });
    builder.addCase(getJobFilterByUser.fulfilled, (state, { payload }) => {
      state.jobFilter = payload?.contents;
      state.jobListHavePages = payload;
      state.jobDetail = payload?.contents;
    });
    builder.addCase(addJob.fulfilled, (state, payload) => {
      if (payload.payload[1] === "repost") {
        state.jobListActived.unshift(payload.payload[0]);
        toast.success("Đăng tuyển công việc thành công!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
      if (payload.payload[1] === "post") {
        toast.success("Đăng tuyển công việc thành công!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
        });
        state.status = "success";
      }
    });
    builder.addCase(updateStatusJob.fulfilled, (state, { payload }) => {
      switch (payload?.status.id) {
        case 4:
          state.jobListActived = state.jobListActived.filter((job) => {
            return job.id !== payload.id;
          });
          state.jobListDisabled.push(payload);
          toast.success("Đóng công việc thành công!", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "colored",
          });
          break;
        default:
          toast.error("Chỉnh sửa trạng thái công việc thất bại!", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "colored",
          });
      }
    });
    builder.addCase(updateJob.fulfilled, (state, { payload }) => {
      state.jobListActived = state.jobListActived.map((job) => {
        if (job.id === payload.id) {
          return payload;
        }
        return job;
      });
      toast.success("Chỉnh sửa công việc thành công!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    });
    builder.addCase(getListCandidateApplied.fulfilled, (state, { payload }) => {
      state.listCandidatesApplied = payload.contents;
      state.totalPages = payload.totalPages;
      state.amountApplications = payload.totalItems;
    });
  },
});
export const getJobList = createAsyncThunk("job/getJobList", async (args) => {
  return axios
    .get(`${baseURL}/api/r2s/job?no=${args[0] - 1}&limit=${args[1]}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

export const getJobById = createAsyncThunk("job/getJobById", async (jobId) => {
  return axios
    .get(`${baseURL}/api/r2s/job/${jobId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

export const getJobByName = createAsyncThunk(
  "job/getJobByName",
  async (jobName) => {
    return axios
      .get(`${baseURL}/api/r2s/job/search?name=${jobName}`)
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

// function use for get list of actived job by user id
/**
 * para
 * args[0] : id of user
 * args[1] : page
 * args[2] : amount of job in each time get
 */
export const getActivedJobListByUserId = createAsyncThunk(
  "job/getJobListByUser",
  async (args) => {
    return axios
      .get(
        `${baseURL}/api/r2s/job/user/${args[0]}?no=${args[1] - 1}&limit=${
          args[2]
        }`
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

// function use for get list of disabled job by user id
/**
 * para
 * args[0] : id of user
 * args[1] : page
 * args[2] : amount of job in each time get
 */
export const getDisabledJobListByUserId = createAsyncThunk(
  "job/getDisabledJobListByUserId",
  async (args) => {
    return axios
      .get(
        `${baseURL}/api/r2s/job/user/disable/${args[0]}?no=${
          args[1] - 1
        }&limit=${args[2]}`
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const getJobPositionList = createAsyncThunk(
  "job/getJobPositionList",
  async () => {
    return axios
      .get(`${baseURL}/api/r2s/JobPosition`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

// function use for adding job
/**
 * para
 * args[0] : data of job
 * args[1] : status of form
 */
export const addJob = createAsyncThunk("job/addJob", async (args) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(`${baseURL}/api/r2s/job`, args[0], axiosConfig)
    .then((response) => {
      return [response.data, args[1]];
    })
    .catch((error) => {
      return error.response.data;
    });
});

export const getJobByCompany = createAsyncThunk(
  "job/getJobByCompany",
  async (companyId) => {
    return axios
      .get(`${baseURL}/api/job/company/${companyId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

// function use for update ?status of job by id job
/**
 * para
 * args[0] : id job
 * args[1] : status
 * args[2] : token
 */
export const updateStatusJob = createAsyncThunk(
  "job/updateStatusJob",
  async (args) => {
    const header = {
      headers: {
        Authorization: "Bearer " + args[2],
      },
    };

    return axios
      .put(`${baseURL}/api/job/status/${args[0]}`, args[1], header)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

// function use for update infor of job by id job
/**
 * para
 * args[0] : id job
 * args[1] : infor of job
 * args[2] : token
 */
export const updateJob = createAsyncThunk("job/updateJob", async (args) => {
  const header = {
    headers: {
      Authorization: "Bearer " + args[2],
    },
  };
  const res = await axios
    .put(`${baseURL}/api/r2s/job/${args[0]}`, args[1], header)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
});

// function use for get list of candidate who apply into job
/**
 * para
 * args[0] : id job
 * args[1] : page
 * args[2] : token
 * args[3] : amount of candidates in each time get
 */
export const getListCandidateApplied = createAsyncThunk(
  "job/getListCandidateApply",
  async (args) => {
    const header = {
      headers: {
        Authorization: "Bearer " + args[2],
      },
    };
    return axios
      .get(
        `${baseURL}/api/r2s/job/candidate/${args[0]}?no=${args[1] - 1}&limit=${
          args[3]
        }`,
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

export const getJobFilterByUser = createAsyncThunk(
  "job/getJobFilterByUser",
  async (dataSearch) => {
    return axios
      .get(`${baseURL}/api/r2s/job/filter`, {
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

export const { updateIdJobActive, updateIndexCardActive } = jobSlice.actions;
export default jobSlice;
