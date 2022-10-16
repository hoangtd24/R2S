import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import api from "src/config/api/apiConfig";

const baseURL = process.env.REACT_APP_API;

const registerSlice = createSlice({
  name: "register",
  initialState: {
    status: "idle",
    statusRegister: "idleRegister",
    user: {},
    error: {},
  },
  reducers: {
    updateStatusRegister: (state, action) => {
      state.status = action.payload;
    },

    updateStatusRegisterForHR: (state, { payload }) => {
      state.statusRegister = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.fulfilled, (state, action) => {
        if (action.payload?.username) {
          state.status = "success step 2";
          state.user = action.payload;
          state.error = {};
        } else {
          state.status = "fail";
          state.user = {};
          state.error = action.payload;
        }
      })
      .addCase(registerHr.pending, (state, action) => {
        state.statusRegister = "loading";
      })
      .addCase(registerHr.fulfilled, (state, { payload }) => {
        if (payload?.id) {
          state.user = payload;
          state.statusRegister = "successRegister";
          toast.success(
            "Bạn đã đăng ký tài khoản thành công, vui lòng chờ xác thực!"
          );
        } else {
          state.statusRegister = "idleRegister";
          toast.error("Đăng ký tài khoản thất bại!");
        }
      })
      .addCase(registerCandidate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerCandidate.fulfilled, (state, action) => {
        if (action.payload?.id) {
          state.user = action.payload;
          state.status = "success";
          state.error = {};
          toast.success("Bạn đã đăng ký tài khoản thành công!");
        } else {
          state.status = "fail";
          state.error = action.payload;
        }
      });
  },
});
export const { updateStatusRegister, updateStatusRegisterForHR } =
  registerSlice.actions;
export default registerSlice;

export const checkUser = createAsyncThunk(
  "register/checkUser",
  async (data) => {
    const res = await api
      .post(`${baseURL}/api/user`, data)
      .then((res) => {
        sessionStorage.setItem("account", JSON.stringify(data));
        return res;
      })
      .catch((error) => {
        return error.response.data;
      });
    return res;
  }
);

// export const registerUser = createAsyncThunk(
//   "register/registerUser",
//   async (data, role) => {
//     let res;
//     switch (role) {
//       case "hr":

//         res = await api
//           .post(`${baseURL}/api/r2s/hr`, data.hrData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           })
//           .then((res) => {
//             return res;
//           })
//           .catch((err) => {
//             return err;
//           });
//         return res;
//       case "candidate":
//         res = await api
//           .post(`${baseURL}/api/r2s/${role}`, data.userData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           })
//           .then((res) => {
//             return res;
//           })
//           .catch((err) => {
//             return err;
//           });
//         return res;
//       default:
//         break;
//     }
//   }
// );

export const registerHr = createAsyncThunk(
  "register/registerHr",
  async (data) => {
    const res = await api
      .post(`${baseURL}/api/r2s/hr`, data.hrData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response.data;
      });
    return res;
  }
);

export const registerCandidate = createAsyncThunk(
  "register/registerCandidate",
  async (data) => {
    const res = await axios
      .post(`${baseURL}/api/r2s/candidate`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response.data;
      });
    return res;
  }
);
