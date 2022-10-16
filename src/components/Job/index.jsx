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
import { useDispatch, useSelector } from "react-redux";
import TagName from "../TagName";
import ButtonMark from "../ButtonMark";
import {
  getJobById,
  updateIdJobActive,
} from "src/store/slices/main/home/job/jobSlice";

const JobCandidate = ({ job, idJob, pdLeft, pdRight, hideMark }) => {
  const dispatch = useDispatch();
  // const { jobDetailById } = useSelector(state => state.job);
  const handleClick = async () => {
    dispatch(updateIdJobActive(idJob));
  };

  useEffect(() => {
    dispatch(getJobById(idJob));
  }, [idJob]);
  return (
    <div
      style={{
        paddingLeft: pdLeft ? pdLeft : "",
        paddingRight: pdRight ? pdRight : "",
      }}
    >
      <Link
        to={`/detail_job/${idJob}`}
        onClick={handleClick}
        className="link__job-detail"
      >
        <Box
          sx={{
            border: 1,
            borderColor: "#DEDEDE",
            borderRadius: 2,
            pd: 0,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "DEDEDE",
              opacity: [0.9, 0.8, 0.7],
            },
            // backgroundColor: "#e6eefa",
            paddingRight: 2,
          }}
        >
          <div className="job__candidate">
            <Box
              sx={{
                width: 55,
                height: 50,
                backgroundColor: "transparent",
                border: "1px solid #dedede",
                borderRadius: "6px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              <img
                className="img-logo"
                alt=""
                src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
                style={{
                  width: 40,
                  height: 35,
                  marginTop: "5px",
                }}
              />
            </Box>
            <div>
              <div>
                <h4 id="job__candidate-infor-name" className="">
                  {job.name}
                </h4>
              </div>
              <div className="job__candidate-infor job__candidate-infor-time">
                <Icon className="job__candidate-info-item-icon">
                  <AccessTimeIcon fontSize="small" />
                </Icon>
                <h6 className="card-content-job-candidate">
                  {moment(job.timeStartStr).format("DD/MM/YYYY")} -{" "}
                  {moment(job.timeEndStr).format("DD/MM/YYYY")}
                </h6>
              </div>
              <div className="job__candidate-infor">
                <Icon className="job__candidate-info-item-icon">
                  <WorkIcon fontSize="small" />
                </Icon>
                <h6 className="card-content-job-candidate">
                  {job.jobType.name}
                </h6>
              </div>
              <div className="job__candidate-infor">
                <Icon className="job__candidate-info-item-icon">
                  <CurrencyExchangeIcon fontSize="small" />
                </Icon>

                <h6 className="card-content-job-candidate">
                  {job.salaryMin} $
                </h6>
              </div>
              <div className="job__candidate-infor">
                <Icon className="job__candidate-info-item-icon">
                  <AddLocationIcon fontSize="small" />
                </Icon>
                <h6 className="card-content-job-candidate card-content-job-candidate-location">
                  {job.locationjob.address}
                </h6>
              </div>
            </div>
            {hideMark === true ? null : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 0 0 auto",
                }}
              >
                <div
                  style={{
                    marginLeft: "10px",
                    marginTop: "11px",
                  }}
                >
                  <TagName title={"Hot"} />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    marginLeft: "auto",
                    marginRight: "10px",
                  }}
                >
                  {/* <ButtonMark width="25px" height="25px" /> */}
                </div>
              </div>
            )}
          </div>
        </Box>
      </Link>
    </div>
  );
};

JobCandidate.propTypes = {};

export default JobCandidate;
