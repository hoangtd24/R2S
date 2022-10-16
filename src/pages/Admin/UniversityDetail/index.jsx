import React from 'react'
import { Paper } from '@mui/material'

import './styles.scss'
// import companyLogo from "../../../assets/img/camera.png";
// import CustomInput from "../../../components/CustomInput";
import UniversityForm from '../../../containers/Admin/UniversityForm'

const UniversityDetail = () => {
  return (
    <div className="university-detail">
      <Paper className="university-detail__title-container">
        <div className="university-detail__title">
          <h2>Quản lý trường</h2>
        </div>
      </Paper>
      <Paper className="university-detail__content-container">
        <h2>Thông tin chi tiết trường</h2>
        <UniversityForm isAdd={false} />
      </Paper>
    </div>
  )
}

export default UniversityDetail
