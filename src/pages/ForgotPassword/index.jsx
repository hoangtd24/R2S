import React, { Fragment, useEffect } from "react";
import "./styles.scss";
import Footer from "src/components/Footer";
import HeaderContainer from "src/components/HeaderContainer";
import CustomInput from "src/components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schema } from "./validateForm.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  updateStatusForgotPassword,
} from "src/store/slices/Admin/user/userSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { statusForgotPassword } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (statusForgotPassword) {
      navigate("/login");
      dispatch(updateStatusForgotPassword(false));
    }
  }, [statusForgotPassword]);

  const onSubmit = (data) => {
    dispatch(forgotPassword(data.email));
  };

  return (
    <Fragment>
      <HeaderContainer />
      <div className="forgotpassword__wrapper">
        <div className="forgotpassword__modal">
          <h2>
            <strong>Quên mật khẩu</strong>
          </h2>
          <p>Xin vui lòng nhập địa chỉ email để lấy lại mật khẩu.</p>
          <form action="">
            <CustomInput
              label="Nhập Email"
              id="email"
              name="email"
              type="email"
              placeholder="Vui lòng nhập email..."
              register={register}
              requirementField={true}
            >
              {errors.email?.message}
            </CustomInput>
            <button
              onClick={handleSubmit(onSubmit)}
              className="forgotpassword__modal-btn"
            >
              Lấy lại mật khẩu
            </button>
          </form>
          <Link to="/login" className="forgotpassword__modal-link">
            Quay về trang đăng nhập
          </Link>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ForgotPassword;
