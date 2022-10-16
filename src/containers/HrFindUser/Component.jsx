import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Divider, Switch, Tooltip, Typography } from "@mui/material";
import React from "react";
import UserInfo from "src/components/Profile/UserInfo";

const BASEURL = process.env.REACT_APP_API;
const Component = ({ profile }) => {

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="profiles">
      <div className="profile_header">
        <img
          style={{ width: 150, height: 150, borderRadius: "50%" }}
          src={
            `${BASEURL}${profile?.user?.avatar}` ||
            "https://o.vdoc.vn/data/image/2022/08/25/avatar-cute-meo-con-than-chet.jpg"
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.onerror = undefined;
            currentTarget.src =
              "https://o.vdoc.vn/data/image/2022/08/25/avatar-cute-meo-con-than-chet.jpg";
          }}
          alt="avatar"
        ></img>
      </div>
      <div className="profile_footer">
        <div style={{ textAlign: "center" }}>
          <div className="profile_name">
            <Typography variant="h6">
              {profile?.user?.firstName} {profile?.user?.lastName}
            </Typography>
          </div>
          <div className="profile_username">
            <h3>@{profile?.user?.username}</h3>
          </div>
          <Divider style={{ padding: 8 }} />
          <div
            className="profile_handle"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "2rem",
              marginTop: 8,
            }}
          >
            <div
              className="profile_children_handle"
              style={{ padding: "0 2rem"}}
            >
              <Tooltip title="Xem CV">
                <RemoveRedEyeIcon />
              </Tooltip>
            </div>
            <div className="profile_children_handle"
              style={{padding : "0 2rem"}}
            >
              <Tooltip title="Tải CV">
                <CloudDownloadRoundedIcon />
              </Tooltip>
            </div>
          </div>
        </div>
        <div>
          <div className="profile_click">
            <div className="profile_check">
              <Typography
                sx={{ marginTop: 0.7 }}
                variant="overline"
                display="block"
                gutterBottom
              >
                Lưu Ứng Viên
              </Typography>
              <Switch
                sx={{
                  marginBottom: 1,
                }}
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </div>

          <div className="profile_check"></div>
        </div>
        <div className="profile_check"></div>
        <div className="profile_info">
          <UserInfo name="Email" profile={profile?.user?.email} />
          <UserInfo name="Số Điện Thoại" profile={profile?.user?.phone} />
          <UserInfo
            name="Chuyên Nghành"
            profile={
              profile?.major?.name
            }
          />
          <UserInfo
            name="Giới Tính"
            profile={
              profile?.user?.gender === 1
                ? "Nữ"
                : profile?.user?.gender === 0
                ? "Nam"
                : "Khác"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Component;
