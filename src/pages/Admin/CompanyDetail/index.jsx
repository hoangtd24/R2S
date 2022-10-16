import React from 'react'
import { Paper } from '@mui/material'

import './styles.scss'
// import companyLogo from "../../../assets/img/camera.png";
// import CustomInput from "../../../components/CustomInput";
import CompanyForm from '../../../containers/Admin/CompanyForm'

const CompanyDetail = () => {
  return (
    <div className="company-detail">
      <Paper className="company-detail__title-container">
        <div className="company-detail__title">
          <h2>Quản lý công ty</h2>
        </div>
      </Paper>
      <Paper className="company-detail__content-container">
        <h2>Thông tin chi tiết công ty</h2>
        <CompanyForm isAdd={false} />
      </Paper>
    </div>
  )
}

export default CompanyDetail
