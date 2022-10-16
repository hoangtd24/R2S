import React from 'react'
import { Paper } from '@mui/material'
// import { Link } from "react-router-dom";

import './styles.scss'
// import userLogo from "../../../assets/img/camera.png";
// import CustomInput from "../../../components/CustomInput";
import MajorForm from '../../../containers/Admin/MajorForm'

const MajorDetail = () => {
  return (
    <div className="user-detail">
      <Paper className="user-detail__title-container">
        <div className="user-detail__title">
          <h2>Quản lý chuyên ngành</h2>
        </div>
      </Paper>
      <Paper className="user-detail__content-container">
        <h2>Tên chuyên ngành</h2>
        <MajorForm isAdd={false} />
      </Paper>
    </div>
  )
}

export default MajorDetail
