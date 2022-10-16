import React from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import "./styles.scss";
import Search from "../../../components/Search";

const HeaderContainer = ({
  headerName,
  placeholder,
  onChange,
  selectName,
  selectOptions,
  onClick,
  searchValue,
  onSearch
}) => {
  return (
    <div className="header-container">
      <Grid container spacing={2}>
        <Grid item xs={12} className="header-container__title">
          <h1>{headerName}</h1>
          <Tooltip title="Thêm">
            <IconButton
              onClick={onClick}
              className="header-container__add-button"
              sx={{ width: "42px" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Search placeholder={placeholder} onChange={onChange} searchValue={searchValue} onSearch={onSearch}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default HeaderContainer;
