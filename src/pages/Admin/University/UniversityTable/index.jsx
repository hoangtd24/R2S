import React, { useEffect, useState } from "react";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import DataTable from "../../../../components/Table";
import {
  deleteUniversity,
  getUniversityList,
  searchUniversity,
  updateUniversityStatus,
} from "../../../../store/slices/Admin/university/unversitySlice";
import ProfileTable from "../../../../components/ProfileTable";

const UniversityTable = ({ searchValue }) => {
  const userSessionStorage =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { universityList, totalPages, totalItems } = useSelector(
    (state) => state.university
  );
  useEffect(() => {
    if (searchValue === "") {
      dispatch(getUniversityList([page, 10]));
    } else {
      dispatch(
        searchUniversity([searchValue, page, 10, userSessionStorage?.token])
      );
    }
  }, [page]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Trường học",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return <ProfileTable row={row} />;
      },
    },
    { field: "shortName", headerName: "Tên viết tắt", width: 150 },

    // { field: "majors", headerName: "Chuyên ngành", width: 130 },
    { field: "createDate", headerName: "Ngày tạo", width: 150 },
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
          dispatch(
            updateUniversityStatus([updateData, userSessionStorage?.token])
          ).then(() => {
            dispatch(getUniversityList([page, 10, userSessionStorage?.token]));
          });
        };
        return (
          <select
            name="status"
            id="status"
            value={row.status.id}
            onChange={(e) => handleChangeStatus(e)}
            className="company-table__select"
          >
            <option value={2}>Not verified</option>
            <option value={1}>Active</option>
            <option value={3}>Block</option>
            <option value={4}>Disable</option>
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
          navigate(`/admin/university/${row.id}`);
        };
        const handleDelete = () => {
          dispatch(deleteUniversity([row.id, userSessionStorage?.token])).then(
            () => {
              dispatch(
                getUniversityList([page, 10, userSessionStorage?.token])
              );
            }
          );
        };
        return (
          <>
            <IconButton className="user-edit__button" onClick={handleClick}>
              <VisibilityOutlinedIcon />
            </IconButton>
            <Tooltip title="Xóa tài khoản">
              <IconButton
                className="user-delete__button"
                onClick={handleDelete}
              >
                <DeleteForeverOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const rows = [];
  for (let i = 0; i < universityList.length; i++) {
    rows.push({
      id: universityList[i].id,
      stt: i + 1,
      name: universityList[i].name,
      shortName: universityList[i].shortName,
      website: universityList[i].website,
      email: universityList[i].email,
      // majors: universityList[i].majors,
      createDate: universityList[i].createDate
        ? moment(universityList[i].createDate).format("DD/MM/YYYY")
        : moment().format("DD/MM/YYYY"),
      status: universityList[i].status,
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

export default UniversityTable;
