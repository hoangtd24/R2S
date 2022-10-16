import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDispatch } from "react-redux";
import "./styles.scss";
import HeaderContainer from "../../../containers/Admin/HeaderContainer/HeaderContainer";
import Modal from "../../../components/Modal";
import UserTable from "./UserTable";
import UserForm from "../../../containers/Admin/UserForm";
import { getUserList, searchUser } from "src/store/slices/Admin/user/userSlice";

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

const User = () => {
  const userSessionStorage =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idRow, setIdRow] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue === "") {
      dispatch(getUserList([1, 10, userSessionStorage?.token]));
    } else {
      dispatch(searchUser([searchValue, 1, 10, userSessionStorage?.token]));
    }
  };

  const handleOpenAddModal = () => {
    setOpen(true);
    setIsUpdate(false);
  };

  return (
    <>
      <HeaderContainer
        headerName="Quản lý tài khoản"
        placeholder="Tìm kiếm người dùng..."
        onChange={(e) => setSearchValue(e.target.value)}
        selectName="role"
        selectOptions={selectOptions}
        btnName="Thêm User"
        BtnIcon={AddOutlinedIcon}
        onClick={handleOpenAddModal}
        searchValue={searchValue}
        onSearch={handleSearch}
      />
      <UserTable
        setIdRow={setIdRow}
        setIsUpdate={setIsUpdate}
        setOpen={setOpen}
        searchValue={searchValue}
      />
      <Modal
        modalTitle={isUpdate ? "Chỉnh sửa tài khoản" : "Thêm tài khoản"}
        open={open}
        setOpen={setOpen}
        iconClose={true}
      >
        <UserForm isUpdate={isUpdate} idRow={idRow} />
      </Modal>
    </>
  );
};
export default User;
