import React, { useEffect } from "react";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import "./styles.scss";
import DataTable from "../../../../components/Table";
import {
  deleteMajor,
  getMajorList,
} from "../../../../store/slices/Admin/major/majorSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const MajorTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { majorList } = useSelector((state) => state.major);

  useEffect(() => {
    dispatch(getMajorList());
  }, [dispatch]);

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "name", headerName: "Tên Chuyên Ngành", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        const handleOnClick = () => {
          navigate(`/admin/major/${row.id}`);
        };
        const handleDeleteMajor = async () => {
          const res = await dispatch(deleteMajor(row.id));
          unwrapResult(res);
        };
        return (
          <>
            <IconButton className="user-edit__button" onClick={handleOnClick}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              className="user-delete__button"
              onClick={handleDeleteMajor}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  const rows = [];
  for (let i = 0; i < majorList.length; i++) {
    rows.push({
      id: majorList[i].id,
      stt: i + 1,
      name: majorList[i].name,
    });
  }

  return (
    <>
      <DataTable rows={rows} columns={columns} />
    </>
  );
};

export default MajorTable;
