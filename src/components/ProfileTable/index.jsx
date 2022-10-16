import React from "react";
import { Tooltip, Avatar } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import "./styles.scss";

const baseURL = process.env.REACT_APP_API;
const ProfileTable = ({ row }) => {

  return (
    <div className="profile-table">
      <div className="profile-table__logo">
        <Avatar
          src={
            row.logo
              ? `${baseURL}${row.logo}`
              : "https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_21.jpg"
          }
          className="profile-table__logo-img"
          alt="profile-table-log"
        />
      </div>
      <div className="profile-table__content">
        <div className="profile-table__content-title">
          <Tooltip title={row ? row.name : ""}>
            <h4>{row ? row.name : ""}</h4>
          </Tooltip>
          {row.status && row.status.id === 1 ? (
            <CheckCircleRoundedIcon className="profile-table__active" />
          ) : null}
        </div>

        <a href={row ? row.website : ""}>website: {row ? row.website : ""}</a>
        <a href={`mailto:${row ? row.email : ""}`}>
          {" "}
          email: {row ? row.email : ""}
        </a>
      </div>
    </div>
  );
};

export default ProfileTable;
