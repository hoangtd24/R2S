import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  deleteUser,
  getUserList,
  searchUser,
  verifyUser,
} from "src/store/slices/Admin/user/userSlice";
import DataTable from "src/components/Table";
import IconEdit from "../../../../assets/img/icons8-write-24.png";
import Confirmation from "src/components/Confirmation";
import Modal from "src/components/Modal";
import verifiedIcon from "../../../../assets/img/verified-icon-16.jpg";
import "./styles.scss";

const UserTable = ({ setIdRow, setIsUpdate, setOpen, searchValue }) => {
  const userSessionStorage =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [confirmation, setConfirmation] = useState({});
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { userList, totalPages, totalItems, onSearch } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (searchValue === "") {
      dispatch(getUserList([page, 10, userSessionStorage?.token]));
    } else {
      dispatch(searchUser([searchValue, page, 10, userSessionStorage?.token]));
    }
  }, [page, onSearch, dispatch, userSessionStorage?.token, searchValue]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Tài khoản", width: 220 },
    { field: "role", headerName: "Vai trò", width: 150 },
    { field: "gender", headerName: "Giới tính", width: 100 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "status", headerName: "Trạng thái", width: 150 },
    {
      field: "action",
      headerName: "Tùy chọn",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        const handleDeleteUser = async () => {
          dispatch(deleteUser([row.username, userSessionStorage?.token])).then(
            () => {
              dispatch(getUserList([page, 10, userSessionStorage?.token]));
            }
          );
        };

        const handleVerifyUser = () => {
          setOpenConfirmation(true);
          setConfirmation({
            text: "Xác minh tài khoản",
            nameBtnYes: "Xác minh",
            func: () => {
              dispatch(
                verifyUser([row.username, userSessionStorage?.token])
              ).then(() => {
                dispatch(getUserList([page, 10, userSessionStorage?.token]));
              });
              setOpenConfirmation(false);
            },
            setOpen: setOpenConfirmation,
            image: verifiedIcon,
            className: "verify",
          });
        };

        const handleOpenUpdateModal = () => {
          setOpen(true);
          setIsUpdate(true);
          setIdRow(row.id);
        };

        return (
          <>
            <Tooltip title="Chỉnh sửa">
              <IconButton onClick={() => handleOpenUpdateModal()}>
                <img src={IconEdit} alt="" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xác minh tài khoản">
              <IconButton
                className="user-verify__button"
                onClick={handleVerifyUser}
              >
                <VerifiedUserIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa tài khoản">
              <IconButton
                className="user-delete__button"
                onClick={handleDeleteUser}
              >
                <DeleteForeverOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Modal
              open={openConfirmation}
              setOpen={setOpenConfirmation}
              iconClose={true}
            >
              <Confirmation
                text={confirmation.text}
                nameBtnYes={confirmation.nameBtnYes}
                setOpen={confirmation.setOpen}
                func={confirmation.func}
                image={confirmation.image}
                className={confirmation.className}
              />
            </Modal>
          </>
        );
      },
    },
  ];
  /**
   * render gender
   * @param {*id}  (0, 1, 2 )
   * @returns (0: "Nam", 1: "Nữ", 2 :"Khác" )
   */
  const handleRenderGender = (id) => {
    switch (id) {
      case 0:
        return "Nam";
      case 1:
        return "Nữ";
      default:
        return "Khác";
    }
  };

  const convertRoleName = (roleName) => {
    const index = roleName.lastIndexOf("_");
    return roleName.substring(index + 1);
  };

  const rows = [];
  for (let i = 0; i < userList.length; i++) {
    rows.push({
      id: userList[i].id,
      stt: userList[i].id + 1,
      username: userList[i].username,
      role: convertRoleName(userList[i]?.role?.name),
      gender: handleRenderGender(userList[i].gender),
      phone: userList[i].phone,
      email: userList[i].email,
      status: userList[i].status.name,
    });
  }

  const handlePagination = (e, value) => {
    setPage(value);
  };

  return (
    <>
      <DataTable
        rows={rows}
        columns={columns}
        totalPages={totalPages}
        totalItems={totalItems}
        handleOnChange={handlePagination}
      />
    </>
  );
};

export default UserTable;
