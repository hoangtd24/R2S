import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import notificationSlice from "../../notifications/notificationSlice";
import api from "../../../../config/api/apiConfig";

const baseURL = process.env.REACT_APP_API;

const majorSlice = createSlice({
  name: "major",
  initialState: {
    majorList: [],
    majorDetail: {},
    error: [],
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getMajorList.fulfilled, (state, { payload }) => {
      state.majorList = payload.contents;
    });
    builder.addCase(addMajor.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
      // state.majorList = payload;
    });
    builder.addCase(getMajorDetail.fulfilled, (state, { payload }) => {
      state.majorDetail = payload;
    });
    builder.addCase(updateMajorInfo.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
    });
    builder.addCase(deleteMajor.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
    });
  },
});

export default majorSlice;

/**
 * get major list
 * @param args[]
 * args[0]: number of page
 * args[1]: amount of element when get each time
 * @returns major list
 */
export const getMajorList = createAsyncThunk(
  "major/getMajorList",
  async (args) => {
    return await axios
      .get(`${baseURL}/api/r2s/admin/major?no=${args[0] - 1}&limit=${args[1]}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

/**
 * Add major
 * @param data
 * @returns notification
 */

export const addMajor = createAsyncThunk(
  "major/addMajor",
  async (data, thunkAPI) => {
    return api
      .post(`${baseURL}/api/major`, data)
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Thêm chuyên ngành thành công")
        );
        data.reset();
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

/**
 * get major detail by comId
 * @params comId
 * @return major detail
 */
export const getMajorDetail = createAsyncThunk(
  "major/getMajorDetail",
  async (uniId) => {
    return await axios
      .get(`${baseURL}/api/${uniId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

/**
 * @params comId updateData
 * @return
 * success => notification
 * error => error.response.data
 */
export const updateMajorInfo = createAsyncThunk(
  "major/updateMajorInfo",
  async (updateData, thunkAPI) => {
    const { majorData, setIsEdit } = updateData;
    return axios
      .put(`${baseURL}/api/major/${majorData.id}`, majorData)
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess(
            "Cập nhật chuyên ngành thành công"
          )
        );
        if (setIsEdit) {
          setIsEdit(false);
        }
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const deleteMajor = createAsyncThunk(
  "major/deleteMajorInfo",
  async (data, thunkAPI) => {
    return axios
      .delete(`${baseURL}/api/major/${data}`)
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Xóa chuyên ngành thành công")
        );
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(error);
      });
  }
);
