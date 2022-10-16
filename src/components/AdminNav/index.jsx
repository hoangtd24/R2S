import React from 'react'
import { Avatar, Tooltip, IconButton, Badge, Hidden } from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined'

import './styles.scss'
import adminLogo from '../../assets/img/logo_admin_green.png'
import AdminAccountMenu from '../AdminAccountMenu'

const AdminNav = ({ openDrawer, setOpenDrawer }) => {
  //
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer)
  }
  return (
    <>
      <div className="admin-navbar">
        <div className="admin-navbar__left">
          <Hidden mdDown>
            <div className="admin-navbar__logo">
              <img src={adminLogo} alt="admin-logo" />
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className="admin-navbar_show">
              <Tooltip title="Show sidebar" onClick={handleOpenDrawer}>
                <ViewQuiltOutlinedIcon />
              </Tooltip>
            </div>
          </Hidden>
        </div>

        <div className="admin-navbar__right">
          <Tooltip title="Thông báo">
            <IconButton className="admin-navbar__icon-notification">
              <Badge badgeContent={4} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <div className="admin-navbar__setting">
            <Tooltip title="Tài khoản">
              <Avatar
                src="https://berrydashboard.io/free/static/media/user-round.13b5a31b.svg"
                alt="admin-avatar"
                className="admin-navbar__avatar"
              />
            </Tooltip>

            <Tooltip title="Cài đặt">
              <AdminAccountMenu/>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminNav
