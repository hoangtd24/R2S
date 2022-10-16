import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const baseURL = process.env.REACT_APP_API;

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: {},
    role: "",
  },
  reducers: {
    updateRole: (state) => {
      state.role = "";
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserById.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.role = payload.user.role.name;
    });
    builder.addCase(updateUser.fulfilled, (state, {payload}) => {
      state.user = payload;
      toast.success("Chỉnh sửa thành công", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

/**
 * args : sesionStorage or localStorage ( token: tokenJWT && ids : ID User)
 */
export const getUserById = createAsyncThunk(
  "profile/getUserById",
  async (args) => {
    const header = {
      headers: {
        Authorization: "Bearer " + args.token,
      },
    };
    //get Role in token
    // Token : XXX.YYY.ZZZ => XXX is header. YYY is payload. ZZZ is signature. func HASHTOKEN get role from YYY
    const HASHTOKEN = () => {
      let base64Url = args.token.split(".")[1];
      let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      let jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload).roles[0].authority;
    };
    switch (HASHTOKEN()) {
      case "Role_HR":
        return await axios
          .get(`${baseURL}/api/r2s/hr/user/${args.ids}`, header)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      case "Role_Partner":
        return await axios
          .get(`${baseURL}/api/r2s/partner/user/${args.ids}`, header)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      case "Role_Candidate":
        return await axios
          .get(`${baseURL}/api/r2s/candidate/user/${args.ids}`, header)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      default:
        return null;
    }
  }
);
export const updateUser = createAsyncThunk(
  "profile/updateUser",
  async (args) => {
    console.log(args);
    const header = {
      headers: {
        Authorization: "Bearer " + args[0].token,
        "Content-Type": "multipart/form-data",
      },
    };
    switch (args[0].role) {
      case "Role_HR": {
        return await axios
          .put(`${baseURL}/api/r2s/hr/${args[2]}`, args[1], header)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      }
      case "Role_Candidate": {
        return await axios
          .put(`${baseURL}/api/r2s/candidate`, args[1], header)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      }
      case "Role_Partner": {
        return await axios
          .put(`${baseURL}/api/r2s/partner`, args[1], header)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      }

      default:
        console.log(args)
        break;
    }
  }
);

export const { updateRole } = profileSlice.actions;
export default profileSlice;
