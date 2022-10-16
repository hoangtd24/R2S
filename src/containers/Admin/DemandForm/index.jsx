import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Switch } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import './styles.scss'
import CustomInput from '../../../components/CustomInput'
import CustomTextarea from '../../../components/CustomTextarea'
import Button from '../../../components/Button'
import Select from '../../../components/Select'
import { schema, renderControlAction } from './script.js'
import { getMajorList } from '../../../store/slices/Admin/major/majorSlice'

const label = { inputProps: { 'aria-label': 'Switch demo' } }

export default function DemandForm(props) {
  const { isAdd } = props
  // const [majorList, setMajorList] = useState([])
  const { majorList } = useSelector(state => state.major)

  const [isEdit, setIsEdit] = useState(isAdd)
  const dispatch = useDispatch()

  // get params from URL
  // const { demandId } = useParams()

  useEffect(() => {
    dispatch(getMajorList())
  }, [dispatch])
  const {
    register,
    handleSubmit,
    formState: { errors }
    // reset,
    // setValue
  } = useForm({
    resolver: yupResolver(schema)
  })

  /**
   * get company details

  /**
   * @dependency demandDetail
   * isAdd ? "" : demandDetail
   */
  //   useEffect(() => {
  //     if (demandDetail) {
  //       if (!isAdd) {
  //         setImage(`baseURL${demandDetail.avatar}`);
  //       }
  //       setValue("logo", isAdd ? "" : demandDetail.avatar);
  //       setValue("name", isAdd ? "" : demandDetail.name);
  //       setValue("description", isAdd ? "" : demandDetail.description);
  //       setValue("email", isAdd ? "" : demandDetail.email);
  //       setValue("phone", isAdd ? "" : demandDetail.phone);
  //       setValue("shortName", isAdd ? "" : demandDetail.shortName);
  //       setValue("website", isAdd ? "" : demandDetail.website);
  //     }
  //   }, [demandDetail, isAdd]);

  // handle Submit form
  const onSubmit = data => {
    // const demandData = {}
    // dispatch(
    //   addDemand({
    //     demandData,
    //     reset: reset({
    //       description: "",
    //       email: "",
    //       logo: "",
    //       name: "",
    //       phone: "",
    //       shortName: "",
    //       website: "",
    //     }),
    //     setImage: setImage(cameraLogo),
    //   })
    // );
  }

  // Click to Edit
  const handleOnClickEdit = () => {
    setIsEdit(!isEdit)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="demand-form"
      encType="multipart/form-data"
    >
      <div className="demand-form__container">
        <Grid container>
          <Grid item md={3}>
            <div className="demand-form__logo">
              {!isAdd ? (
                <div className="demand-form__control">
                  <ul>{renderControlAction()}</ul>
                  <div className="demand-form__block">
                    <p>Khóa tài khoản</p>
                    <Switch {...label} defaultChecked />
                  </div>
                  <button
                    type="button"
                    onClick={handleOnClickEdit}
                    className="demand-form__button-edit"
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
                <div className="demand-form__input">
                  <CustomInput
                    label="Tiêu đề"
                    id="name"
                    type="text"
                    placeholder="Tiêu đề..."
                    register={register}
                    // defaultValue="name"
                    check={!isEdit}
                  >
                    {errors.name?.message}
                  </CustomInput>
                  <Select
                    selectName="Chuyên ngành"
                    selectOptions={majorList}
                    id="major"
                    register={register}
                    check={!isEdit}
                  />

                  <CustomInput
                    label="Ngày bắt đầu"
                    id="start"
                    type="date"
                    placeholder=""
                    register={register}
                    check={!isEdit}
                  >
                    {errors.start?.message}
                  </CustomInput>
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="demand-form__input">
                  <CustomInput
                    label="Cộng tác viên"
                    id="partner"
                    type="number"
                    placeholder=""
                    register={register}
                    check={!isEdit}
                  >
                    {errors.partner?.message}
                  </CustomInput>
                  <CustomInput
                    label="Danh sách sinh viên"
                    id="students"
                    type="file"
                    placeholder="Phải là file excel danh sách sinh viên."
                    register={register}
                    check={!isEdit}
                  >
                    {errors.students?.message}
                  </CustomInput>
                  <CustomInput
                    label="Ngày hết hạn"
                    id="end"
                    type="date"
                    placeholder=""
                    register={register}
                    check={!isEdit}
                  >
                    {errors.end?.message}
                  </CustomInput>
                </div>
              </Grid>
              <Grid item md={12}>
                <div className="demand-form__input">
                  <CustomTextarea
                    label="Mô tả"
                    id="description"
                    type="description"
                    placeholder="Mô tả nhu cầu..."
                    register={register}
                    check={!isEdit}
                  >
                    {errors.description?.message}
                  </CustomTextarea>
                  <CustomTextarea
                    label="Yêu cầu"
                    id="requirement"
                    type="description"
                    placeholder="Yêu cầu ..."
                    register={register}
                    check={!isEdit}
                  >
                    {errors.requirement?.message}
                  </CustomTextarea>
                  <CustomTextarea
                    label="Thông tin khác"
                    id="otherInfo"
                    type="description"
                    placeholder="Các thông tin khác..."
                    register={register}
                    check={!isEdit}
                  >
                    {errors.otherInfo?.message}
                  </CustomTextarea>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {isAdd ? (
        <div className="demand-form__submit">
          <Button name="Thêm bài đăng" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}

      {isEdit & !isAdd ? (
        <div className="demand-form__submit">
          <Button name="Cập nhật" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}
    </form>
  )
}
