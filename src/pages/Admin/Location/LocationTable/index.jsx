import React, { useEffect } from 'react'
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { IconButton } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import './styles.scss'
import DataTable from '../../../../components/Table'
import { getLocationList } from '../../../../store/slices/location/locationSlice'

const LocationTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { locationList } = useSelector(state => state.location)
  useEffect(() => {
    dispatch(getLocationList())
  }, [])

  const columns = [
    { field: 'stt', headerName: 'STT', width: 70 },
    { field: 'District', headerName: 'Quận', width: 100 },
    { field: 'Country', headerName: 'Quốc gia', width: 100 },
    { field: 'StreetName', headerName: 'Tên đường', width: 250 },
    { field: 'Province', headerName: 'Tỉnh/Thành Phố', width: 150 },
    {
      field: 'NoteAddress',
      headerName: 'Ghi chú thêm của địa chỉ',
      width: 250
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      sortable: false,
      renderCell: params => {
        const { row } = params
        const handleOnClick = () => {
          navigate(`/admin/major/${row.id}`)
        }
        const deleteMajorr = async () => {
          // const res = await dispatch(deleteMajor(row.id))
          // unwrapResult(res)
        }
        return (
          <>
            <IconButton className="user-edit__button" onClick={handleOnClick}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton className="user-delete__button" onClick={deleteMajorr}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </>
        )
      }
    }
  ]
  const rows = []
  for (let i = 0; i < locationList.length; i++) {
    rows.push({
      stt: i + 1,
      District: locationList[i].district.name,
      Province: locationList[i].district.province.name,
      Country: locationList[i].district.province.countries.name,
      StreetName: locationList[i].address,
      NoteAddress: locationList[i].note
    })
  }
  // const idDistrict = [];
  // for (let i = 0; i < locationList.length; i++) {
  //   idDistrict.push(locationList[i].district.id)
  // }

  // for (let i = 0; i < idDistrict.length; i++) {
  //   dispatch(getDistrictById(idDistrict[i]))
  // }


  return (
    <>
      <DataTable rows={rows} columns={columns} />
    </>
  )
}

export default LocationTable
