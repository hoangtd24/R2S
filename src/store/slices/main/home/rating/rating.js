import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_API;
const user =
  JSON.parse(sessionStorage.getItem("userPresent"))?.token ||
  JSON.parse(localStorage.getItem("userPresent"))?.token;
const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    rating: 0,
    allRating: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRatingCompany.fulfilled, (state, action) => {
      state.rating = action.payload;
    });
    builder.addCase(getAllRating.fulfilled, (state, action) => {
      state.allRating = action.payload;
    });
  },
});

export const getRatingCompany = createAsyncThunk(
  "rating/getRatingCompany",
  async (idCompany = 1) => {
    const header = {
      headers: {
        Authorization: "Bearer " + user,
      },
    };
    return axios
      .get(`${baseURL}/api/r2s/rate/company/${idCompany}?no=0&limit=5`, header)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
export const getAllRating = createAsyncThunk(
  "rating/getAllRating",
  async (args) => {
    return axios
      .get(`${baseURL}/api/r2s/rate?no=${args[0]}&limit=${args[1]}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }
);
export default ratingSlice;
