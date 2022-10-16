import React, { useEffect, useState } from "react";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../../components/Table";
import {
  getAdminListDemand,
  searchDemand,
  updateDemandStatus,
} from "src/store/slices/Admin/demand/adminDemandSlice";

const DemandTable = ({ searchValue }) => {
  const userSessionStorage =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { demandList, totalPages, totalItems } = useSelector(
    (state) => state.adminDemand
  );

  useEffect(() => {
    if (searchValue === "") {
      dispatch(getAdminListDemand([page, 10]));
    } else {
      dispatch(
        searchDemand([searchValue, page, 10, userSessionStorage?.token])
      );
    }
  }, [page]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Tiêu đề bài đăng",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Tooltip title={row.name}>
            <p>{row.name}</p>
          </Tooltip>
        );
      },
    },
    { field: "partner", headerName: "Cộng tác viên", width: 150 },
    { field: "major", headerName: "Chuyên ngành", width: 250 },
    { field: "createDate", headerName: "Ngày tạo", width: 150 },
    { field: "students", headerName: "Danh sách sinh viên", width: 150 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 120,
      renderCell: (params) => {
        const { row } = params;
        const handleChangeStatus = (e) => {
          const updateData = {
            university: JSON.stringify({
              status: {
                id: parseInt(e.target.value),
              },
            }),
          uniId: row.id,
        };
        dispatch(updateDemandStatus([updateData, userSessionStorage?.token])).then(() => {
          dispatch(getAdminListDemand([page, 10, userSessionStorage?.token]))
        })
        };
        return (
          <select
            // name={row.status}
            // id={row.status}
            // value={row.status || 0}
            onChange={(e) => handleChangeStatus(e)}
            className="company-table__select"
          >
            <option value={0}>Not verified</option>
            <option value={1}>Active</option>
            <option value={2}>Block</option>
            <option value={3}>Disable</option>
          </select>
        );
      },
    },
    {
      field: "action",
      headerName: "Tùy chọn",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        const handleClick = () => {
          navigate(`/admin/Demand/${row.id}`);
        };
        return (
          <>
            <IconButton className="user-edit__button" onClick={handleClick}>
              <VisibilityOutlinedIcon />
            </IconButton>
            <IconButton className="user-delete__button">
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = [];
  for (let i = 0; i < demandList.length; i++) {
    rows.push({
      id: demandList[i]?.id,
      stt: i + 1,
      name: demandList[i]?.name,
      major: demandList[i]?.major?.name,
      partner: demandList[i]?.partner?.position,
      createDate: demandList[i]?.createDate,
      status: demandList[i]?.status,
      students: demandList[i]?.students,
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

export default DemandTable;
