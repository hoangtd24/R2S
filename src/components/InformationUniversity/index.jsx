import React from "react";
import PropTypes from "prop-types";

// import Button from "../Button";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { Icon } from "@mui/material";
import moment from "moment";
import { Typography } from "@mui/material";
import "./styles.scss";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Button from "../Button";

const baseURL = process.env.REACT_APP_API;

const InformationUniversity = ({ jobDetail, detailJob = false }) => {

  const handleApplyDemandUni = async (e) => {};

  return (
    <div>
      <div className="detail__card-3-partner">
        <Typography variant="span">
          <Typography
            variant="span"
            sx={{ fontSize: 16, color: "black", fontWeight: "700" }}
          >
            Bản tin tuyển dụng:
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{ fontSize: 17, fontWeight: "400" }}
          >
            {detailJob ? (
              <div
                dangerouslySetInnerHTML={{ __html: jobDetail?.desciption }}
              ></div>
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: jobDetail?.description }}
              ></div>
            )}
          </Typography>
        </Typography>
        <div className="detail__card-3-item-partner">
          <Typography variant="span">
            <Typography variant="span" sx={{ fontSize: 16, fontWeight: "700" }}>
              Thời hạn ứng tuyển:
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ fontSize: 16, fontWeight: "400" }}
            >
              {moment(jobDetail.createDate).format("DD/MM/YYYY")} -{" "}
              {moment(jobDetail.end).format("DD/MM/YYYY")}
            </Typography>
          </Typography>

          <Typography variant="span">
            <Typography
              variant="div"
              sx={{ fontSize: 16, color: "black", fontWeight: "700" }}
            >
              <div className="detail__card-list-students-link">
                <a
                  className="list-students-file"
                  href={`${jobDetail?.students}`}
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  Tải danh sách sinh viên
                </a>
              </div>
            </Typography>
          </Typography>
        </div>
      </div>
      <div className="line"></div>
      <div className="detail__card-4">
        <div className="detail__card-4-item" sx={{ display: "flex" }}>
          <Icon className="detail__card-4-item-icon">
            <LocalPhoneIcon />
          </Icon>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: 14,
              fontWeight: "400",
              transform: "translate(5px,5px)",
            }}
          >
            {jobDetail?.universityDTO?.phone || "Không có"}
          </Typography>
        </div>
        <div className="detail__card-4-item" sx={{ display: "flex" }}>
          <Icon className="detail__card-4-item-icon">
            <EmailOutlinedIcon />
          </Icon>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: 14,
              fontWeight: "400",
              transform: "translate(5px,5px)",
            }}
          >
            {jobDetail?.universityDTO?.email || "Không có"}
          </Typography>
        </div>
        <div className="detail__card-4-item">
          <AddLocationIcon className="detail__card-4-item-icon"></AddLocationIcon>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: 14,
              fontWeight: "400",
              transform: "translate(5px,5px)",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {jobDetail?.universityDTO?.locations[0]?.district?.province?.name || "Không có"}
          </Typography>
        </div>
      </div>
      {/* <div className="detail__card-5">
        <Button name="Ứng tuyển" onClick={handleApplyDemandUni} />
      </div> */}
    </div>
  );
};

InformationUniversity.propTypes = {
  star: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  detailJob: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InformationUniversity;
