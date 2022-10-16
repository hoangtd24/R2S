import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    open: false,
    severity: null,
    message: null
  },
  reducers: {
    successMess: (state, action) => {
      return (state = {
        open: true,
        severity: 'success',
        message: action.payload
      })
    },
    errorMess: (state, action) => {
      return (state = {
        open: true,
        severity: 'error',
        message: action.payload
      })
    },
    close: (state, action) => {
      return (state = {
        ...state,
        open: false
      })
    }
  }
})

export default notificationSlice
