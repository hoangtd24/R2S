import React from 'react'
import { Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import './styles.scss'
import DemandForm from '../../../containers/Admin/DemandForm'
import ArrowButton from '../../../components/ArrowButton'

const DemandDetail = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <div className="demand-detail">
      <Paper className="demand-detail__title-container">
        <div className="demand-detail__title">
          <h2>Quản lý nhu cầu</h2>
        </div>
      </Paper>
      <Paper className="demand-detail__content-container">
        <h2>Thông tin chi tiết bài đăng</h2>
        <DemandForm isAdd={false} />
        <div className="demand-detail__back" onClick={handleBackClick}>
          <ArrowButton direction="left" text="Trở lại" />
        </div>
      </Paper>
    </div>
  )
}

export default DemandDetail
