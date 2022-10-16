import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import HeaderContainer from "../../../containers/Admin/HeaderContainer/HeaderContainer";
import Modal from "../../../components/Modal";
import UniversityTable from "./UniversityTable";
import UniversityForm from "../../../containers/Admin/UniversityForm";
import {
  getUniversityList,
  searchUniversity,
} from "src/store/slices/Admin/university/unversitySlice";
import { getProvinceList } from "src/store/slices/location/locationSlice";

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

export default function University() {
  const userSessionStorage =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const [open, setOpen] = useState(false);


  const handleSearch = () => {
    if (searchValue === "") {
      dispatch(getUniversityList([1, 10]));
    } else {
      dispatch(
        searchUniversity([searchValue, 1, 10, userSessionStorage?.token])
      );
    }
  };

  const handleOpenModal = () => {
    dispatch(getProvinceList())
    setOpen(true);
  };

  return (
    <>
      <HeaderContainer
        headerName="Quản lý trường học"
        placeholder="Tìm kiếm trường..."
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
        searchValue={searchValue}
        selectName="position"
        selectOptions={selectOptions}
        btnName="Thêm Uni"
        BtnIcon={AddOutlinedIcon}
        onClick={handleOpenModal}
      />
      <UniversityTable searchValue={searchValue} />
      <Modal modalTitle="Thêm trường" open={open} setOpen={setOpen}>
        <UniversityForm isAdd={true} />
      </Modal>
    </>
  );
}
