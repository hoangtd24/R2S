import { createSlice } from "@reduxjs/toolkit";


// slices contain global states of the project 
const globalSlices = createSlice({
  name: "globalSlices",
  initialState: {
    isRightAuth : "", 
  },
  reducers: {
    setISRigthAuth: (state, action) => {
      state.isRightAuth = action.payload;
    },
  },
  extraReducers: (builder) => {

  }
});

export const { setISRigthAuth } = globalSlices.actions;
export default globalSlices;
