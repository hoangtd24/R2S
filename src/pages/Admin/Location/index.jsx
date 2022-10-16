import React, { useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import HeaderContainer from '../../../containers/Admin/HeaderContainer/HeaderContainer'
import Modal from '../../../components/Modal'
import LocationTable from './LocationTable'
import LocationForm from '../../../containers/Admin/LocationForm'

const selectOptions = [
  {
    value: 'All',
    name: 'All'
  },
  {
    value: 'HR',
    name: 'HR'
  },
  {
    value: 'Candidate',
    name: 'Candidate'
  },
  {
    value: 'Partner',
    name: 'Partner'
  }
]

export default function Location() {
  const [open, setOpen] = useState(false)

  const handleSearch = e => {}

  const handleOpenModal = () => {
    setOpen(true)
  }

  return (
    <>
      <HeaderContainer
        headerName="Quản lý location"
        placeholder="Tìm kiếm location..."
        onchange={handleSearch}
        selectName="role"
        selectOptions={selectOptions}
        btnName=""
        BtnIcon={AddOutlinedIcon}
        onClick={handleOpenModal}
      />
      <LocationTable />
      <Modal modalTitle="Thêm location" open={open} setOpen={setOpen}>
        <LocationForm isAdd={true} />
      </Modal>
    </>
  )
}
