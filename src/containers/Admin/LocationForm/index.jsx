import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'

import './styles.scss'
import CustomInput from '../../../components/CustomInput'
// import CustomTextarea from "../../../components/CustomTextarea";
import Button from '../../../components/Button'
import cameraLogo from '../../../assets/img/camera.png'
// import Select from "../../../components/Select";
import { schema } from './script.js'

// const label = { inputProps: { "aria-label": "Switch demo" } };

const LocationForm = props => {
  const { isAdd } = props

  const [image, setImage] = useState(cameraLogo)
  // const fileInput = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  // show preview image
  const showPreviewImage = e => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0]
      const reader = new FileReader()
      reader.onload = x => {
        setImage(x.target.result)
      }
      reader.readAsDataURL(imageFile)
    }
  }

  const onSubmit = data => {
    const universityData = {
      logo: data.logo[0],
      university: JSON.stringify({
        description: data.description,
        email: data.email,
        // logo: null,
        name: data.name,
        phone: data.phone,
        shortName: data.shortName,
        website: data.website
      })
    }

    // dispatch(
    //   addUniversity({
    //     universityData,
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="location-form"
    >
      <div className="location-form__container">
        <Grid container>
          <Grid item md={12}>
            <Grid container>
              <Grid item md={6}>
                <div className="location-form__input">
                  <CustomInput
                    id="district"
                    type="text"
                    placeholder="Tên quận..."
                    register={register}
                  >
                    {errors.district?.message}
                  </CustomInput>
                  <CustomInput
                    label=""
                    id="province"
                    placeholder="Tên tỉnh/thành phố..."
                    register={register}
                  >
                    {errors.province?.message}
                  </CustomInput>
                  <CustomInput
                    label=""
                    id="countries"
                    placeholder="Tên quốc gia..."
                    register={register}
                  >
                    {errors.countries?.message}
                  </CustomInput>
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="location-form__input">
                  <CustomInput
                    label=""
                    id="address"
                    type=""
                    placeholder="Địa chỉ..."
                    register={register}
                  >
                    {errors.address?.message}
                  </CustomInput>
                  <CustomInput
                    id="note"
                    type="text"
                    placeholder="Ghi chú..."
                    register={register}
                  >
                    {errors.ten?.message}
                  </CustomInput>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      {isAdd ? (
        <div className="location-form__submit">
          <Button name="Thêm Location" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}
    </form>
  )
}

export default LocationForm
