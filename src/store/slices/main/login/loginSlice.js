import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../config/api/apiConfig";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API;

const loginSlice = createSlice({
  name: "login",
  initialState: {
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload?.token && action.payload?.role !== "Role_Admin") {
          state.status = "success";
          toast.success("Đăng nhập thành công", {
            position: "bottom-right",
            autoClose: 2000,
            theme: "colored",
          });
          sessionStorage.setItem(
            "userPresent",
            JSON.stringify({
              token: action.payload.token,
              ids: action.payload.idUser,
            })
          );
        } else {
          state.status = "fail";
          toast.error("Tài khoản hoặc mật khẩu không đúng!", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      })
      .addCase(loginAdmin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        if (action.payload?.token && action.payload?.role === "Role_Admin") {
          state.status = "success";
          toast.success("Đăng nhập thành công", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "colored",
          });
          sessionStorage.setItem("userPresent", JSON.stringify(action.payload));
        } else {
          state.status = "fail";
          toast.error("Tài khoản hoặc mật khẩu không đúng!", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      });
  },
});

export const loginUser = createAsyncThunk("login/loginUser", async (data) => {
  const res = await api
    .post(`${baseURL}/api/signin`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
});

export const loginAdmin = createAsyncThunk("login/loginAdmin", async (data) => {
  const res = await api
    .post(`${baseURL}/api/signin`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
});

export default loginSlice;
