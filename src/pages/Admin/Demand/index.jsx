import React, { useState } from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDispatch } from "react-redux";

import HeaderContainer from "../../../containers/Admin/HeaderContainer/HeaderContainer";
import Modal from "../../../components/Modal";
import DemandTable from "./DemandTable";
import DemandForm from "../../../containers/Admin/DemandForm";
import { searchDemand } from "src/store/slices/Admin/demand/adminDemandSlice";

export default function Demand() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const userSessionStorage =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchDemand([searchValue, 1, 10, userSessionStorage?.token]));
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <>
      <HeaderContainer
        headerName="Quản lý nhu cầu tìm việc"
        placeholder="Tìm kiếm nhu cầu..."
        // selectName="position"
        btnName="Thêm bài đăng"
        BtnIcon={AddOutlinedIcon}
        onClick={handleOpenModal}
        onSearch={handleSearch}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <DemandTable searchValue={searchValue} />
      <Modal modalTitle="Thêm bài đăng" open={open} setOpen={setOpen}>
        <DemandForm isAdd={true} />
      </Modal>
    </>
  );
}
