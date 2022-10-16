import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "./styles.scss";
import CustomInput from "../../../components/CustomInput";
import Button from "../../../components/Button";
import { genderList, schema } from "./data";
import InputFile from "src/components/InputFile";
import CustomSelect from "src/components/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  adminUpdateUser,
  createUser,
  getUserById,
  updateUser,
} from "src/store/slices/Admin/user/userSlice";
import { toast } from "react-toastify";

const UserForm = (props) => {
  const userSessionStorage =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));
  const { isUpdate, idRow } = props;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getUserById([idRow, userSessionStorage?.token]));
  }, [dispatch, idRow, userSessionStorage?.token]);

  useEffect(() => {
    setValue("isUpdate", isUpdate);
  }, [isUpdate, setValue]);

  useEffect(() => {
    setValue("isUpdate", isUpdate);
  });
  useEffect(() => {
    if (isUpdate) {
      setValue("username", user?.username);
      setValue("email", user?.email);
      setValue("firstName", user?.firstName);
      setValue("lastName", user?.lastName);
      setValue("phone", user?.phone);
      setValue("gender", user?.gender);
      setValue("role", user?.role?.id);
    }
  }, [isUpdate, setValue, user]);

  const onSubmit = async (data) => {
    const userData = {
      fileAvatar: data.avatar[0] || null,
      candidate: JSON.stringify({
        createUser: {
          username: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
          gender: parseInt(data.gender),
          lastName: data.lastName,
          firstName: data.firstName,
          phone: data.phone,
          email: data.email,
        },
        major: {
          id: parseInt(data.role),
        },
      }),
    };
    try {
      const res = await dispatch(
        createUser([userData, userSessionStorage?.token])
      );

      if (res.payload.status === 200 || res.payload.status === 201) {
        toast.success("Tạo tài khoản thành công");
      } else {
        toast.error("Tạo tài khoản thất bại");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onUpdate = async (data) => {
    const userData = {
      fileAvatar: data.avatar[0] || null,
      candidate: JSON.stringify({
        createUser: {
          id: idRow,
          username: data.username,
          gender: parseInt(data.gender),
          lastName: data.lastName,
          firstName: data.firstName,
          phone: data.phone,
          email: data.email,
        },
        major: {
          id: parseInt(data.role),
        },
      }),
    };

    try {
      const res = await dispatch(
        adminUpdateUser([userData, userSessionStorage?.token])
      );
      if (res.payload.status === 200 || res.payload.status === 201) {
        toast.success("Chỉnh sửa tài khoản thành công");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const roleList = [
    { name: "Nhà tuyển dụng", id: 1 },
    { name: "Admin", id: 2 },
    { name: "Ứng viên", id: 3 },
    { name: "Cộng tác viên", id: 4 },
  ];

  return (
    <>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="user-form"
      >
        <div className="user-form__wrapper">
          <div className="user-form__avatar">
            <InputFile
              label="Ảnh đại diện"
              requirementField={false}
              id="avatar"
              format="image"
              className="avatar-input"
              setValue={setValue}
              register={register}
            >
              {errors.avatar?.message}
            </InputFile>
          </div>
          <div className="user-form__input-infor">
            <div className="row">
              <CustomInput
                id="username"
                label="Tên tài khoản"
                className="user-form__input-item"
                type="text"
                placeholder="Abcdef..."
                register={register}
              >
                {errors.username?.message}
              </CustomInput>
              <CustomInput
                id="email"
                className="user-form__input-item"
                label="Email"
                type="email"
                placeholder="abc@gmail.com..."
                register={register}
              >
                {errors.email?.message}
              </CustomInput>
            </div>
            {!isUpdate ? (
              <div className="row">
                <CustomInput
                  id="password"
                  className="user-form__input-item"
                  label="Mật khẩu"
                  type="password"
                  visibility={true}
                  placeholder="Abc123..."
                  register={register}
                >
                  {errors.password?.message}
                </CustomInput>
                <CustomInput
                  id="confirmPassword"
                  className="user-form__input-item"
                  label="Xác nhận mật khẩu"
                  type="password"
                  visibility={true}
                  placeholder="Abc123..."
                  register={register}
                >
                  {errors.confirmPassword?.message}
                </CustomInput>
              </div>
            ) : (
              <>
                <input
                  id="password"
                  type="hidden"
                  {...register("password")}
                  disabled
                />
                <input
                  id="confirmPassword"
                  type="hidden"
                  {...register("confirmPassword")}
                  disabled
                />
              </>
            )}
            <div className="row">
              <CustomInput
                id="firstName"
                className="user-form__input-item"
                label="Họ"
                type="text"
                placeholder="Nguyễn Văn..."
                register={register}
              >
                {errors.firstName?.message}
              </CustomInput>
              <CustomInput
                id="lastName"
                className="user-form__input-item"
                label="Tên"
                type="text"
                placeholder="An..."
                register={register}
              >
                {errors.lastName?.message}
              </CustomInput>
            </div>
            <div className="row">
              <CustomInput
                id="phone"
                className="user-form__input-item"
                label="Số điện thoại"
                type="tel"
                placeholder="0964xxx473..."
                register={register}
              >
                {errors.phone?.message}
              </CustomInput>
              <CustomSelect
                id="gender"
                className="user-form__input-item"
                label="Giới tính"
                placeholder="Chọn giới tính..."
                register={register}
                options={genderList}
              >
                {errors.gender?.message}
              </CustomSelect>
            </div>
            <div className="row">
              <CustomSelect
                id="role"
                className="user-form__input-item"
                label="Vai trò"
                placeholder="Chọn vai trò..."
                register={register}
                options={roleList}
              >
                {errors.role?.message}
              </CustomSelect>
            </div>
          </div>
        </div>
        <div className="user-form__submit">
          {!isUpdate ? (
            <Button name="Thêm người dùng" onClick={handleSubmit(onSubmit)} />
          ) : (
            <Button name="Lưu" onClick={handleSubmit(onUpdate)} />
          )}
        </div>
      </form>
    </>
  );
};

export default UserForm;
