import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    // status: 200,
    loading: 0,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = state.loading + 15;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state, action) => {
          // state.status = action.payload.status;
          state.loading = state.loading - 15;
        }
      );
  },
});

export default appSlice;
