import { Box } from "@mui/system";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import { Typography } from "@mui/material";
const HeaderBaseInformationCompany = ({ jobDetail }) => {

  return (
    <div>
      <Box
        sx={{
          border: "1px solid #DEDEDE",
        }}
        elevation={0}
        PaperProps={{
          elevation: 0,
        }}
      >
        <div className="base__information-card">
          <div
            style={{
              marginRight: "16px",
            }}
          >
            <Box
              elevation={0}
              sx={{
                width: 135,
                height: 120,
                backgroundColor: "white",
                border: "1px solid #DEDEDE",
                borderRadius: "6px",
                marginRight: "20px",
                marginTop: "16px",
                marginLeft: "28px",
              }}
            >
              <img
                className="img-logo"
                alt=""
                src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
              />
            </Box>
          </div>

          <div className="base__information-card-detail">
            <h3 className="company-name">{jobDetail?.hr?.company.name}</h3>
            <div
            className="company_info"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "block",
                  marginRight: "20px",
                }}
              >
                <div
                  className=""
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <PhoneInTalkIcon
                    sx={{
                      fontSize: 18,
                      color: "#04bf8a",
                    }}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      transform: "translate(5px,0px)",
                    }}
                  >
                    {jobDetail?.hr?.company?.phone}
                  </Typography>
                </div>
                <div className="">
                  <h5
                    style={
                      {
                        // marginTop: "7px",
                      }
                    }
                  >
                    <EmailIcon
                      sx={{
                        fontSize: 18,
                        color: "#04bf8a",
                      }}
                    />
                    <a
                      href={`mailto:${jobDetail?.hr?.company.email}`}
                      className=" "
                    >
                      {jobDetail?.hr?.company.email}
                    </a>
                  </h5>
                </div>
              </div>

              <div
                className="detail-website"
                style={
                  {
                    // height: "58px",
                  }
                }
              >
                <h5
                  className=""
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <LanguageIcon
                    sx={{
                      fontSize: 18,
                      color: "#04bf8a",
                    }}
                  />
                  <a
                    href={jobDetail?.hr?.company.website}
                    className=""
                    style={{}}
                  >
                    {jobDetail?.hr?.company.website}
                  </a>
                </h5>

                <div
                  className=" base__information-card-detail-location-candidate"
                  style={
                    {
                    }
                  }
                >
                  <LocationOnIcon
                    sx={{
                      fontSize: 18,
                      color: "#04bf8a",
                    }}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: 16,
                      fontWeight: "400",
                      transform: "translate(5px,0px)",
                    }}
                  >
                    {`${jobDetail?.locationjob?.address} ${jobDetail?.locationjob?.district.province.name}`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default HeaderBaseInformationCompany;
