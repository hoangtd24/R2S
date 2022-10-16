import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import "./styles.scss";
import PaginationCustom from "../Pagination";


const DataTable = ({
  rows,
  columns,
  totalPages,
  totalItems = 0,
  handleOnChange,
}) => {
  return (
    <Paper className="data-table">
      <div className="data-table_container">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.stt}
          loading={!rows.length}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
          autoHeight
          density="comfortable"
          headerHeight={43}
          rowHeight={60}
          // disableColumnFilter={true}
          disableDensitySelector={true}
          disableColumnMenu={true}
          hideFooterPagination
        />
      </div>
      <div className="data-table__pagination">
        <p className="data-table__total-item">{`Tổng cộng: ${totalItems}`}</p>
        <PaginationCustom
          totalPages={totalPages}
          handleOnChange={handleOnChange}
        />
      </div>
    </Paper>
  );
};

export default DataTable;
