import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/Button";
import CustomInput from "src/components/CustomInput";
import InputFile from "src/components/InputFile";
import SelectCustom from "src/components/Select";
import { updateUser } from "src/store/slices/main/user/userSlice";
import "./styles.scss";
import { genderList, schema } from "./validateForm";

const ProfileForm = ({ profile : user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const {role} = useSelector(state=>state.profile)
  const userStorage = JSON.parse(sessionStorage.getItem("userPresent")) ||
   JSON.parse(localStorage.getItem("userPresent"));
  const dispatch = useDispatch();

  useEffect(() => {
    setValue(
      "firstName",
      user?.user?.firstName || user?.userDTO?.firstName
    );
    setValue("lastName", user?.user?.lastName || user?.userDTO?.lastName);
    setValue("email", user?.user?.email || user?.userDTO?.email);
    setValue("phone", user?.user?.phone || user?.userDTO?.phone);
    setValue("gender", user?.user?.gender);
  }, [user, setValue]);

  const onSubmit = (data) => {
    const userPost = {
      userStorage,
      role
    }
    switch (role) {
      case "Role_HR": {
        const profileData = {
          hr: JSON.stringify({
            user: {
              username: user?.user?.username,
              gender: parseInt(data.gender),
              phone: data.phone,
              email: user?.user?.email,
              firstName: data.firstName,
              lastName: data.lastName,
              role: user?.user?.role,
            },
            position: user?.position,
            company: { id: user?.company?.id },
          }),
          fileAvatar: data.avatar,
        };
        dispatch(updateUser([userPost, profileData, user.id]));
        break;
      }
      case "Role_Candidate": {
        const profileData = {
          candidate: JSON.stringify({
            createUser: {
              id: parseInt(user?.user.id),
              firstName: data.firstName,
              lastName: data.lastName,
              gender: parseInt(data.gender),
              phone: data.phone,
              email: user?.user?.email,
            },
            major: {
              id: user?.major.id,
            },
          }),
          fileAvatar: data.avatar || null,
          fileCV: user?.cv,
        };
        dispatch(updateUser([userPost, profileData]));
        break;
      }
      case "Role_Partner": {
        const profileData = {
          partner : JSON.stringify({
            id: parseInt(user.id),
            position: user?.position,
            userCreationDTO: {
              username : user?.user.username, 
              firstName: data.firstName,
              lastName: data.lastName,
              gender: parseInt(data.gender),
              phone: data.phone,
              email: user?.user?.email,
            },
            // fileAvatar: data.avatar || null,
          }),
        };
        dispatch(updateUser([userPost, profileData]));
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <form className="profile-form__wrapper" autoComplete="off">
        <Typography variant="button" style={{fontSize : 22}}>Thay đổi thông tin</Typography>
        <div className="profile-form__content">
          <p className="title-requirement">
            (<span className="field-requirment"> * </span>)Trường bắt buộc
          </p>
          <div className="profile-form__content-item">
            <InputFile
              label="Ảnh đại diện"
              requirementField={false}
              id="avatar"
              format="image"
              radius="2px"
              setValue={setValue}
              register={register}
              imageCurrent={user?.user?.avatar}
            >
              {errors.avatar?.message}
            </InputFile>
          </div>
          <div className="profile-form__content-item">
            <CustomInput
              register={register}
              setValue={setValue}
              id="lastName"
              label="Họ"
              className="profile-form__input"
              radius="2px"
              height="45px"
              border="1px solid #777777"
            >
              {errors.lastName?.message}
            </CustomInput>
            <CustomInput
              register={register}
              setValue={setValue}
              id="firstName"
              label="Tên"
              className="profile-form__input"
              radius="2px"
              height="45px"
              border="1px solid #777777"
            >
              {errors.firstName?.message}
            </CustomInput>
          </div>
          <div className="profile-form__content-item">
            <SelectCustom
              setValue={setValue}
              id="gender"
              register={register}
              label="Giới tính"
              defaultValue={user?.user?.gender}
              options={genderList}
              placeholder="Vui lòng chọn"
            >
              {errors.gender?.message}
            </SelectCustom>
            <CustomInput
              register={register}
              setValue={setValue}
              id="phone"
              type="text"
              label="Số điện thoại"
              className="profile-form__input"
              radius="2px"
              height="45px"
              border="1px solid #777777"
            >
              {errors.phone?.message}
            </CustomInput>
          </div>
        </div>
        <div className="profile-form__action">
          <Button
            name="Lưu"
            bheight={44}
            onClick={handleSubmit(onSubmit)}
            fz="18px"
            outline="1.5px solid #DEDEDE"
            className="profile-form__action-btn"
          />
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
