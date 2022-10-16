import React from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useDispatch } from 'react-redux'
import notificationSlice from '../../store/slices/notifications/notificationSlice'

const Notification = props => {
  const { notifyAlert, ...other } = props

  const dispatch = useDispatch()

  const handleCloseNotification = () => {
    dispatch(notificationSlice.actions.close())

  }

  return (
    <Snackbar
      open={notifyAlert.open}
      onClose={handleCloseNotification}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={2000}
    >
      <Alert severity={notifyAlert.severity} onClose={handleCloseNotification}>
        {notifyAlert.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
