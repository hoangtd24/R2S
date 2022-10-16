import React, { useEffect, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import "./styles.scss";
import DataTable from "../../../../components/Table";
import {
  getCompanyList,
  updateCompanyInfo,
  deleteCompany,
  searchCompany,
} from "../../../../store/slices/Admin/company/companySlice";
import ProfileTable from "../../../../components/ProfileTable";

const CompanyTable = ({ searchValue }) => {
  const userSessionStorage =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { companyList, totalPages, totalItems } = useSelector(
    (state) => state.company
  );

  useEffect(() => {
    dispatch(searchCompany([searchValue, page, 10, userSessionStorage?.token]));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Công ty",
      width: 380,
      renderCell: (params) => {
        const { row } = params;
        return <ProfileTable row={row} />;
      },
    },
    {
      field: "tax",
      headerName: "Mã số thuế",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return (
          <a
            href={`https://www.google.com/search?q=ma+so+thue+${row.tax}`}
            className="company-table__hyperlink"
          >
            {row.tax}
          </a>
        );
      },
    },
    { field: "date", headerName: "Ngày tạo", flex: 1 },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        const handleChangeStatus = (e) => {
          const updateData = {
            companyData: {
              company: JSON.stringify({
                description: row.description,
                email: row.email,
                // logo: image,
                name: row.name,
                phone: row.phone,
                tax: row.tax,
                website: row.website,
                status: {
                  id: parseInt(e.target.value),
                },
              }),
              fileLogo: null,
            },
            comid: row.id,
          };
          dispatch(updateCompanyInfo(updateData)).then(() => {
            dispatch(getCompanyList([page, 10, userSessionStorage?.token]));
          });
        };
        return (
          <select
            name="status"
            id="status"
            value={row.status ? row.status.id : 2}
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
          navigate(`/admin/company/${row.id}`);
        };

        const handleDelete = () => {
          dispatch(deleteCompany(row.id)).then(() => {
            dispatch(getCompanyList([page, 10, userSessionStorage?.token]));
          });
        };
        return (
          <>
            <Tooltip title="Chi tiết">
              <IconButton className="user-edit__button" onClick={handleClick}>
                <VisibilityOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
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
  for (let i = 0; i < companyList.length; i++) {
    rows.push({
      id: companyList[i].id,
      stt: i + 1,
      name: companyList[i].name,
      website: companyList[i].website,
      email: companyList[i].email,
      tax: companyList[i].tax,
      date: companyList[i].date
        ? moment(companyList[i].date).format("DD/MM/YYYY")
        : moment().format("DD/MM/YYYY"),
      status: companyList[i].status,
      description: companyList[i].description,
      logo: companyList[i].logo,
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

export default CompanyTable;
