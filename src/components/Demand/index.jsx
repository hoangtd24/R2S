import React, { useState, useEffect } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import WorkIcon from "@mui/icons-material/Work";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Box from "@mui/material/Box";
import { Icon } from "@mui/material";
import "./styles.scss";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateIdJobActive } from "src/store/slices/main/home/job/jobSlice";

const DemandPartner = ({ demand, idDemand }) => {
  const dispatch = useDispatch();
  const handleClick = async () => {
    dispatch(updateIdJobActive(idDemand));
  };
  return (
    <div
      style={{
        marginRight: "15px",
      }}
    >
      <Link
        to={`/partner/detail_demand/${idDemand}`}
        onClick={handleClick}
        className="link__demand-detail"
      >
        <Box
          sx={{
            width: 220,
            minHeight: 160,
            border: 1,
            borderColor: "#DEDEDE",
            borderRadius: 2,
            pd: 0,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "DEDEDE",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <div className="demand__partner">
            <h4
              id="demand__partner-infor-name"
              className="demand__partner-infor demand__partner-infor-name-job"
            >
              {demand.name}
            </h4>
            <div className="demand__partner-infor demand__partner-infor-time">
              <Icon className="demand__partner-info-item-icon">
                <AccessTimeIcon fontSize="small" />
              </Icon>
              <h6 className="card-content-demand__partner">
                {moment(demand?.createDate).format("DD/MM/YYYY")} -{" "}
                {moment(demand?.end).format("DD/MM/YYYY")}
              </h6>
            </div>
            <div className="demand__partner-infor">
              <Icon className="demand__partner-info-item-icon">
                <WorkIcon fontSize="small" />
              </Icon>
              <h6 className="card-content-demand__partner">{demand?.jobType?.name || "Không có"}</h6>
            </div>
            <div className="demand__partner-infor">
              <Icon className="demand__partner-info-item-icon">
                <CurrencyExchangeIcon fontSize="small" />
              </Icon>

              <h6 className="card-content-demand__partner">{demand?.amount > 0 ? demand.amount : "Không có"} sinh viên</h6>
            </div>
            <div className="demand__partner-infor">
              <Icon className="demand__partner-info-item-icon">
                <AddLocationIcon fontSize="small" />
              </Icon>
              <h6 className="card-content-job-candidate">
                {demand?.address || "Không có"}
              </h6>
            </div>
          </div>
        </Box>
      </Link>
    </div>
  );
};

DemandPartner.propTypes = {};

export default DemandPartner;
