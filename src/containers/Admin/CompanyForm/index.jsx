import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Grid, Switch } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import "./styles.scss";
import CustomInput from "../../../components/CustomInput";
import CustomTextarea from "../../../components/CustomTextarea";
import CustomSelect from "../../../components/CustomSelect";
import Button from "../../../components/Button";
import cameraLogo from "../../../assets/img/camera.png";
import { schema, renderControlAction } from "./script.js";
import {
  addCompany,
  getCompanyDetail,
  updateCompanyInfo,
} from "../../../store/slices/Admin/company/companySlice";
import {
  getProvinceList,
  getDistrictList,
} from "../../../store/slices/location/locationSlice";

const label = { inputProps: { "aria-label": "Switch demo" } };
const baseURL = process.env.REACT_APP_API;

export default function CompanyForm(props) {
  const { isAdd } = props;

  const { companyDetail, error } = useSelector((state) => state.company);
  const { provinceList, districtList } = useSelector((state) => state.location);

  console.log("provinceList", provinceList)
  console.log("districtList", districtList)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // local state
  const [image, setImage] = useState(cameraLogo);
  const [imageFile, setImageFile] = useState(null);
  const [isEdit, setIsEdit] = useState(isAdd);

  // const fileInput = useRef()
  const dispatch = useDispatch();

  // get company ID params from URL
  const { comid } = useParams();

  useEffect(() => {
    dispatch(getProvinceList());
    dispatch(getDistrictList(1));
  }, [dispatch]);

  useEffect(() => {
    if (!isAdd) {
      // dispatch(getCompanyDetail(comid));
      dispatch(getCompanyDetail(1));

    }
  }, [isAdd, dispatch, comid]);

  useEffect(() => {
    if (!isAdd) {
      setImage(`${baseURL}${companyDetail.logo}`);
    }
    setValue("name", isAdd ? "" : companyDetail.name);
    setValue("description", isAdd ? "" : companyDetail.description);
    setValue("email", isAdd ? "" : companyDetail.email);
    setValue("phone", isAdd ? "" : companyDetail.phone);
    setValue("tax", isAdd ? "" : companyDetail.tax);
    setValue("website", isAdd ? "" : companyDetail.website);
  }, [companyDetail]);


  // show preview image
  const showPreviewImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {

        setImageFile(imageFile);
        setImage(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  // handle Submit form
  const onSubmit = (data) => {
    const companyData = {
      company: JSON.stringify({
        description: data.description,
        email: data.email,
        // logo: image,
        name: data.name,
        phone: data.phone,
        tax: data.tax,
        website: data.website,
      }),
      fileLogo: data.logo[0],
      location: JSON.stringify({
        address: data.address,
        note: "note",
      }),
    };

    if (isAdd) {
      const addData = { companyData, reset };
      dispatch(addCompany(addData));
    } else {
      const updateData = {
        companyData: {
          company: JSON.stringify({
            description: data.description,
            email: data.email,
            // logo: image,
            name: data.name,
            phone: data.phone,
            tax: data.tax,
            website: data.website,
            status: {
              id: 4,
            },
          }),
          fileLogo: data.logo[0],
        },
        setIsEdit,
        comid,
      };
      dispatch(updateCompanyInfo(updateData));
    }
  };

  // Click to Edit
  const handleOnClickEdit = () => {
    setIsEdit(!isEdit);
  };

  // handle change district
  // const handleChangeDistrict = (e) => {
  //   dispatch(getDistrictList(e.target.value));
  // };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // autoComplete="off"
      className="company-form"
    >
      <div className="company-form__container">
        <Grid container>
          <Grid item md={3}>
            <div className="company-form__logo">
              <Avatar
                src={image}
                // variant="rounded"
                alt="company-logo"
                className="company-form__avatar"
                // onClick={() => fileInput.current.click()}
              />
              {/* <h3>Company Name</h3> */}
              <input
                id="logo"
                type="file"
                name="logo"
                {...register("logo")}
                onChange={showPreviewImage}
                // ref={fileInput}
              />
              <p className="company-form__error">{errors.logo?.message}</p>

              {!isAdd ? (
                <div className="company-form__control">
                  <ul>{renderControlAction()}</ul>
                  <div className="company-form__block">
                    <p>Kh??a t??i kho???n</p>
                    <Switch {...label} defaultChecked />
                  </div>
                  <button
                    type="button"
                    className="company-form__button-edit"
                    onClick={handleOnClickEdit}
                  >
                    S???a
                  </button>
                </div>
              ) : null}
            </div>
          </Grid>
          <Grid item md={9}>
            <Grid container>
              <Grid item md={6}>
                <div className="company-form__input">
                  <CustomInput
                    label="T??n c??ng ty"
                    id="name"
                    type="text"
                    placeholder="T??n c??ng ty..."
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.name?.message}
                    {error?.Name}
                  </CustomInput>
                  <CustomInput
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="email..."
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {error?.Email}
                    {errors.email?.message}
                  </CustomInput>
                  <CustomInput
                    label="S??? ??i???n tho???i"
                    id="phone"
                    type="tel"
                    placeholder="S??? ??i???n tho???i..."
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.phone?.message}
                  </CustomInput>
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="company-form__input">
                  <CustomInput
                    label="Website"
                    id="website"
                    type="text"
                    placeholder="Website..."
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {error?.Website}
                    {errors.website?.message}
                  </CustomInput>
                  <CustomInput
                    label="M?? s??? thu???"
                    id="tax"
                    type="text"
                    placeholder="M?? s??? thu???..."
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.tax?.message}
                  </CustomInput>

                  <div className="company-form__selector">
                    <div className="company-form__selector-item">
                      <CustomSelect
                        name="T???nh"
                        label="T???nh"
                        placeholder="Ch???n t???nh..."
                        dispatch={dispatch}
                        getDistrictList={getDistrictList}
                        options={provinceList}
                        id="province"
                        register={register}

                      />
                      {/* {errors.province?.message} */}
                    </div>
                    <div className="company-form__selector-item">
                      <CustomSelect
                        name="Qu???n/Huy???n"
                        label="Qu???n/Huy???n"
                        placeholder="Ch???n qu???n/huy???n..."
                        options={districtList}
                        id="district"
                        register={register}
                      />
                      {/* {errors.district?.message} */}
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid container item md={12}>
                <Grid item md={6}>
                  <div className="company-form__input">
                    <CustomTextarea
                      label="M?? t??? c??ng ty"
                      id="description"
                      type="description"
                      placeholder="M?? t??? c??ng ty..."
                      register={register}
                      check={!isEdit}
                    >
                      {errors.description?.message}
                    </CustomTextarea>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="company-form__input">
                    <CustomTextarea
                      label="Chi ti???t ?????a ch???"
                      id="address"
                      type="description"
                      placeholder="Chi ti???t ?????a ch???..."
                      register={register}
                      check={!isEdit}
                    >
                      {errors.address?.message}
                    </CustomTextarea>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {isAdd ? (
        <div className="company-form__submit">
          <Button name="Th??m c??ng ty" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}

      {isEdit & !isAdd ? (
        <div className="company-form__submit">
          <Button name="C???p nh???t" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}
    </form>
  );
}
