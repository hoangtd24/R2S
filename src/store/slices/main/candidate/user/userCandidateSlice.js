import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = process.env.REACT_APP_API;

const userCandidateSlice = createSlice({
  name: "userFilter",
  initialState: {
    allUser: [],
    majors: "",
    names: "",
    change: false,
  },
  reducers: {
    nameFilterChange: (state, action) => {
      state.names = action.payload;
    },
    majorFilterChange: (state, action) => {
      state.majors = action.payload.name;
    },
    changeFilterChange: (state, action) => {
      state.change = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUserCandidate.fulfilled, (state, action) => {
      state.allUser = action.payload.contents;
    });
  },
});

export const getAllUserCandidate = createAsyncThunk(
  "user/getAllUserCandidate",
  async () => {
    const user =
      JSON.parse(sessionStorage.getItem("userPresent")) ||
      JSON.parse(localStorage.getItem("userPresent"));
    return axios
      .get(`${baseURL}/api/r2s/admin/candidate?no=0&limit=1000`, {
        headers: "Bearer " + user.token,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
export const { nameFilterChange, majorFilterChange, changeFilterChange } =
  userCandidateSlice.actions;
export default userCandidateSlice;
