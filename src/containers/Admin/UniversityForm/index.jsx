import React, {
  useState,
  // useRef,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Grid, Switch } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import "./styles.scss";
import CustomInput from "../../../components/CustomInput";
import CustomTextarea from "../../../components/CustomTextarea";
import Button from "../../../components/Button";
import cameraLogo from "../../../assets/img/camera.png";
import { schema, renderControlAction } from "./script.js";
import {
  addUniversity,
  addUniversityByAdmin,
  getUniversityDetail,
  updateUniversityInfo,
} from "../../../store/slices/Admin/university/unversitySlice";
import MultiSelect from "../../../components/MultiSelect";
import CustomSelect from "src/components/CustomSelect";
import CustomSelectLocation from "src/components/CustomSelectLocation";
import { getDistrictList } from "src/store/slices/location/locationSlice";

const label = { inputProps: { "aria-label": "Switch demo" } };
const baseURL = process.env.REACT_APP_API;

export default function UniversityForm(props) {
  const { isAdd } = props;
  const userSessionStorage =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));

  const { universityDetail } = useSelector((state) => state.university);
  const { districtList, provinceList } = useSelector((state) => state.location);
  const [image, setImage] = useState(cameraLogo);
  const [isEdit, setIsEdit] = useState(isAdd);
  // const fileInput = useRef(null)
  const dispatch = useDispatch();

  // get params from URL
  const { uniId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * get company details
   */
  useEffect(() => {
    if (!isAdd) {
      setImage(cameraLogo);
      dispatch(getUniversityDetail(uniId));
    }
  }, [isAdd, dispatch]);

  /**
   * @dependency universityDetail
   * isAdd ? "" : universityDetail
   */
  useEffect(() => {
    if (universityDetail) {
      if (!isAdd) {
        setImage(`${baseURL}${universityDetail.avatar}`);
      }
      // setValue("logo", isAdd ? "" : universityDetail.avatar);
      setValue("name", isAdd ? "" : universityDetail.name);
      setValue("description", isAdd ? "" : universityDetail.description);
      setValue("email", isAdd ? "" : universityDetail.email);
      setValue("phone", isAdd ? "" : universityDetail.phone);
      setValue("shortName", isAdd ? "" : universityDetail.shortName);
      setValue("website", isAdd ? "" : universityDetail.website);
    }
  }, [universityDetail, isAdd]);

  // show preview image
  const showPreviewImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImage(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  // handle Submit form
  const onSubmit = (data) => {
    const universityData = {
      // file: data.logo[0],
      university: JSON.stringify({
        name: data.name,
        shortName: data.shortName,
        email: data.email,
        description: data.description,
        website: data.website,
        phone: data.phone,
        location: [
          {
            district: {
              id: data.district,
            },
            address: data.address,
            note: data.note,
          },
        ],
        // logo: null,
      }),
    };

    if (isAdd) {
      dispatch(
        addUniversityByAdmin([
          {
            universityData,
            reset: reset({
              description: "",
              email: "",
              logo: "",
              name: "",
              phone: "",
              shortName: "",
              website: "",
            }),
            setImage: setImage(cameraLogo),
          },
          userSessionStorage?.token,
        ])
      );
    } else {
      const updateData = {
        universityData,
        uniId,
      };
      dispatch(updateUniversityInfo(updateData));
    }
  };

  // Click to Edit
  const handleOnClickEdit = () => {
    setIsEdit(!isEdit);
  };

  const typeList = [
    { name: "Đại học", id: 1 },
    { name: "Cao đẳng", id: 2 },
    { name: "Trung cấp", id: 3 },
  ];
  const getDistrict = (id) => {
    dispatch(getDistrictList(id));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="university-form"
      encType="multipart/form-data"
    >
      <div className="university-form__container">
        <Grid container>
          <Grid item md={3}>
            <div className="university-form__logo">
              <Avatar
                src={image}
                alt="university-logo"
                className="university-form__avatar"
              />
              <input
                id="logo"
                type="file"
                name="logo"
                {...register("logo")}
                onChange={showPreviewImage}
              />
              <p className="university-form__error">{errors.logo?.message}</p>

              {!isAdd ? (
                <div className="university-form__control">
                  <ul>{renderControlAction()}</ul>
                  <div className="university-form__block">
                    <p>Khóa tài khoản</p>
                    <Switch {...label} defaultChecked />
                  </div>
                  <button
                    type="button"
                    onClick={handleOnClickEdit}
                    className="university-form__button-edit"
                  >
                    Sửa
                  </button>
                </div>
              ) : null}
            </div>
          </Grid>
          <Grid item md={9}>
            <Grid container>
              <Grid item md={6}>
                <div className="university-form__input">
                  <CustomInput
                    label="Tên trường"
                    id="name"
                    type="text"
                    placeholder="Tên trường..."
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.name?.message}
                  </CustomInput>
                  <CustomInput
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="abc.xyz@gmail.co..."
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.email?.message}
                  </CustomInput>
                  <CustomInput
                    label="Số điện thoại"
                    id="phone"
                    type="tel"
                    placeholder="Số điện thoại..."
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.phone?.message}
                  </CustomInput>
                  <CustomSelectLocation
                    id="province"
                    className="user-form__input-item"
                    label="Tỉnh"
                    placeholder="Chọn tỉnh..."
                    register={register}
                    options={provinceList}
                    onChange={(id) => getDistrict(id)}
                  >
                    {errors.province?.message}
                  </CustomSelectLocation>
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="university-form__input">
                  <CustomInput
                    label="Website"
                    id="website"
                    type="text"
                    placeholder="Website..."
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.website?.message}
                  </CustomInput>
                  <CustomInput
                    label="Tên viết tắt"
                    id="shortName"
                    type="text"
                    placeholder="UTE..."
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.tax?.message}
                  </CustomInput>
                  <CustomSelect
                    id="type"
                    className="user-form__input-item"
                    label="Loại trường"
                    placeholder="Chọn loại trường..."
                    register={register}
                    options={typeList}
                  >
                    {errors.type?.message}
                  </CustomSelect>
                  <CustomSelect
                    id="district"
                    className="user-form__input-item"
                    label="Quận/huyện"
                    placeholder="Chọn quận/huyện..."
                    register={register}
                    options={districtList}
                  >
                    {errors.district?.message}
                  </CustomSelect>
                </div>
              </Grid>
              <Grid item md={12}>
                <div className="university-form__input">
                  <CustomTextarea
                    label="Mô tả trường"
                    id="description"
                    type="description"
                    placeholder="Mô tả trường..."
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.description?.message}
                  </CustomTextarea>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {isAdd ? (
        <div className="university-form__submit">
          <Button name="Thêm trường" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}

      {isEdit & !isAdd ? (
        <div className="university-form__submit">
          <Button name="Cập nhật" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}
    </form>
  );
}
