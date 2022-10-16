import React from 'react'
import { Paper } from '@mui/material'
// import { Link } from "react-router-dom";

import './styles.scss'
// import userLogo from "../../../assets/img/camera.png";
// import CustomInput from "../../../components/CustomInput";
import UniversityForm from '../../../containers/Admin/UniversityForm'

const UserDetail = () => {
  return (
    <div className="user-detail">
      <Paper className="user-detail__title-container">
        <div className="user-detail__title">
          <h2>Quản lý trường</h2>
        </div>
      </Paper>
      <Paper className="user-detail__content-container">
        <h2>Thông tin chi tiết trường</h2>
        <UniversityForm isAdd={false} />
      </Paper>
    </div>
  )
}

export default UserDetail
