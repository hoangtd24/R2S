import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../../config/api/apiConfig'
import notificationSlice from '../notifications/notificationSlice'

const baseURL = process.env.REACT_APP_API

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    provinceList: [],
    districtList: [],
    locationList: [],
    error: [],
    districtById: []
  },
  reducer: {},
  extraReducers: builder => {
    builder.addCase(getProvinceList.fulfilled, (state, { payload }) => {
      state.provinceList = payload
    })
    builder.addCase(getDistrictList.fulfilled, (state, { payload }) => {
      state.districtList = payload
    })
    builder.addCase(getLocationList.fulfilled, (state, { payload }) => {
      state.locationList = payload
    })
    builder.addCase(getDistrictById.fulfilled, (state, { payload }) => {
      state.districtById = payload
    })
    // builder.addCase(getAddress)
    builder.addCase(addLocation.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload
      }
      // state.majorList = payload;
    })
  }
})

export default locationSlice

/**
 * get province list by country id
 * @params countryId
 * @return provinceList
 */
export const getProvinceList = createAsyncThunk(
  'location/getProviceList',
  async (countryId = 231) => {
    return axios
      .get(`${baseURL}/api/province/country/${countryId}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data
      })
  }
)

export const getDistrictList = createAsyncThunk(
  'location/getDistrictList',
  async provinceId => {
    return axios
      .get(`${baseURL}/api/district/province/${provinceId}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error)
        return error.response.data
      })
  }
)
export const getDistrictById = createAsyncThunk(
  'location/getDistrictById',
  async provinceId => {
    return axios
      .get(`${baseURL}/api/district/${provinceId}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data
      })
  }
)

export const getLocationList = createAsyncThunk(
  'location/getLocationList',
  async () => {
    return axios
      .get(`${baseURL}/api/location`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data
      })
  }
)

export const addLocation = createAsyncThunk(
  'location/addLocation',
  async (data, thunkAPI) => {
    return api
      .post(`${baseURL}/api/location`, data)
      .then(response => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess('Thêm location thành công')
        )
        data.reset()
        return response.data
      })
      .catch(error => {
        return error.response.data
      })
  }
)
