import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import "./responsive.scss";
import Login from "../../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/Button";
import { updateRole } from "src/store/slices/main/user/userSlice";
import { toast } from "react-toastify";

const LoginContainer = () => {
  const { role } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const handleLogout = () => {
    sessionStorage.removeItem("userPresent");
    localStorage.removeItem("userPresent");
    dispatch(updateRole());
    toast.warning("Bạn vừa đăng xuất", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "dark",
    });
  };
  if (role) {
    return (
      <div className="login-container">
        <h1 className="login-container__title">Thông Báo</h1>
        <span>Bạn đã đăng nhập.</span>
        <div className="register-container__footer">
          <Button name={"Đăng xuất"} onClick={handleLogout} />
        </div>
      </div>
    );
  }
  return (
    <div className="login-container">
      <h1 className="login-container__title">Đăng nhập</h1>
      <Login />
      <div className="register-container__footer">
        <Link to="/forgot-password">Quên mật khẩu?</Link>
      </div>
    </div>
  );
};

export default LoginContainer;
