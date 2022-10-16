import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import HeaderContainer from "../../../containers/Admin/HeaderContainer/HeaderContainer";
import Modal from "../../../components/Modal";
import MajorForm from "../../../containers/Admin/MajorForm";
import MajorTable from "./MajorTable/index";

const selectOptions = [
  {
    value: "All",
    name: "All",
  },
  {
    value: "HR",
    name: "HR",
  },
  {
    value: "Candidate",
    name: "Candidate",
  },
  {
    value: "Partner",
    name: "Partner",
  },
];

export default function Major() {
  const [open, setOpen] = useState(false);

  const handleSearch = (e) => {};

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <>
      <HeaderContainer
        headerName="Quản lý chuyên ngành"
        placeholder="Tìm kiếm chuyên ngành..."
        onchange={handleSearch}
        selectName="role"
        selectOptions={selectOptions}
        btnName=""
        BtnIcon={AddOutlinedIcon}
        onClick={handleOpenModal}
      />
      <MajorTable />
      <Modal modalTitle="Thêm Major" open={open} setOpen={setOpen}>
        <MajorForm isAdd={true} open={open} setOpen={setOpen} />
      </Modal>
    </>
  );
}
