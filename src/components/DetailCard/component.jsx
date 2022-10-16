import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TagName from "../TagName";
import { useDispatch } from "react-redux";
import { getJobList } from "../../store/slices/main/home/job/jobSlice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import InformationCompany from "../InformationComapny";
import BaseInformationCompany from "../BaseInformationCompany";
import { Box } from "@mui/material";
import InformationUniversity from "../InformationUniversity";
import BaseInformationUniversity from "../BaseInformationUniversity";
const API = process.env.REACT_APP_API;
export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Detail = ({
  logo,
  jobDetail,
  jobListName,
  candidate,
  jobPostHR,
  jobDetailById,
  demandPartner = false,
  rating,
  jobListCompany,
}) => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [jobType, setJobType] = useState({});
  const [jobPosition, setJobPosition] = useState({});
  const [major, setMajor] = useState({});
  const user =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));
  useEffect(() => {
    if (jobDetail) {
      setJobType(jobDetail?.jobType);
      setJobPosition(jobDetail?.jobposition);
      setMajor(jobDetail.major);
    }
  }, [jobDetail]);
  useEffect(() => {
    dispatch(getJobList([1, 20]));
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {jobDetail && (
        <div className="detail__card detail__card-ontablet containerDetailCard-home">
          <div className="detail__card-1">
            <div className="detail__card-intro">
              <img
                className="detail__card__logo"
                alt="detail-card-logo"
                src={
                  user?.role?.includes("Role_HR")
                    ? `${API}${jobDetail?.universityDTO?.avatar}`
                    : `${API}${jobDetail?.hr?.company?.logo}`
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.onerror = undefined;
                  currentTarget.src =
                    "https://o.vdoc.vn/data/image/2022/08/25/avatar-cute-meo-con-than-chet.jpg";
                }}
              />
              <div>
                <h2>{jobDetail?.name}</h2>
                <p className="name-company">
                  {jobDetail.hr?.company?.name ||
                    jobDetail?.universityDTO?.name}
                </p>
              </div>
            </div>
            <div className="detail__card-2">
              <div className="tag-name">
                <div className="tag-name__name">
                  <TagName
                    title={
                      jobType?.name || jobDetail?.jobType?.name || "Không có"
                    }
                  />
                  <TagName
                    title={
                      jobPosition?.name ||
                      jobDetail?.position?.name ||
                      "Không có"
                    }
                  />
                  <TagName title={major?.name || "Công nghệ thông tin"} />
                </div>
              </div>
            </div>
          </div>
          <div>
            {!demandPartner ? (
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    mt: 1,
                    fontSize: 3,
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="primary"
                    scrollButtons
                    sx={{}}
                  >
                    <Tab
                      label="Chi tiết"
                      {...a11yProps(0)}
                      textColor="inherit"
                      sx={{ fontSize: 12 }}
                    />
                    <Tab
                      label="Tổng quan công ty"
                      {...a11yProps(1)}
                      textColor="inherit"
                      sx={{ fontSize: 12 }}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <InformationCompany
                    jobDetail={jobDetail}
                    rating={rating}
                  ></InformationCompany>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <BaseInformationCompany
                    jobDetail={jobDetail}
                    jobListCompany={jobListCompany}
                  />
                </TabPanel>
              </Box>
            ) : (
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    mt: 1,
                    fontSize: 3,
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="primary"
                    scrollButtons
                  >
                    <Tab
                      label="Chi tiết"
                      {...a11yProps(0)}
                      textColor="inherit"
                      sx={{ fontSize: 12 }}
                    />
                    <Tab
                      label="Thông tin về trường"
                      {...a11yProps(1)}
                      textColor="inherit"
                      sx={{ fontSize: 12 }}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <InformationUniversity
                    jobDetail={jobDetail}
                    rating={rating}
                  ></InformationUniversity>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <BaseInformationUniversity
                    demandDetail={jobDetail}
                    demandListUni={jobListName}
                  />
                </TabPanel>
              </Box>
            )}
          </div>
        </div>
      )}

      {jobDetailById && jobDetailById !== {} && (
        <div className="detail__card detail__card-ontablet containerDetailCard-home">
          <div className="detail__card-1">
            <div className="detail__card-intro">
              <img
                className="detail__card__logo"
                alt="detail-card-logo"
                src={
                  user?.role?.includes("Role_Partner")
                    ? `${API}${jobDetailById?.universityDTO?.avatar}`
                    : `${API}${jobDetailById?.hr?.company?.logo}`
                }
              />
              <div>
                <h2>{jobDetailById?.name || jobDetailById?.name}</h2>
                <p className="name-company">
                  {jobDetailById?.hr?.company?.name ||
                    jobDetailById?.universityDTO?.name}
                </p>
              </div>
            </div>
            <div className="detail__card-2">
              <div className="tag-name">
                <div className="tag-name__name">
                  <TagName
                    title={jobDetailById?.jobType?.name || "Không cós"}
                  />
                  <TagName
                    title={jobDetailById?.jobposition?.name || "Không có"}
                  />
                  <TagName title={jobDetailById?.major?.name || "Không có"} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Box sx={{ width: "100%" }}>
              {demandPartner ? (
                <InformationUniversity
                  jobDetail={jobDetailById}
                  demandPartner={demandPartner}
                  detailJob={true}
                ></InformationUniversity>
              ) : (
                <InformationCompany jobDetailById={jobDetailById} />
              )}
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};
export default Detail;
