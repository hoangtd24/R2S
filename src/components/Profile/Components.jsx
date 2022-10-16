import { yupResolver } from "@hookform/resolvers/yup";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { Divider, Switch, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getAllUserCandidate } from "src/store/slices/main/candidate/user/userCandidateSlice";
import { updateUser } from "src/store/slices/main/user/userSlice";
import Button from "../Button";
import InputFile from "../InputFile";
import Modal from "../Modal";
import { schema } from "./dataCV";
import UserInfo from "./UserInfo";
const BASEURL = process.env.REACT_APP_API;
const Components = ({ profile }) => {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [opens, setOpens] = useState(false);
  const handleChange = (e) => {
  };
  const [checkedFind, setCheckedFind] = React.useState(true);
  const [checkedEmail, setCheckedEmail] = React.useState(false);
  const [open, setOpen] = useState(false);

  const handleChangeFind = (event) => {
    setCheckedFind(event.target.checked);
  };
  const handleCheckEmail = (event) => {
    setCheckedEmail(event.target.checked);
  };

  const handleClick = (number) => {
    switch (number) {
      case 1: {
        return setOpens(!opens);
      }
      case 2: {
        return setOpen(!open);
      }
      default:
        break;
    }
  };

  const onSubmit = async (data) => {
    const userSessionStorage = JSON.parse(
      sessionStorage.getItem("userPresent")
    ) || JSON.parse(
      localStorage.getItem("userPresent")
    )
    const profileData = {
      candidate: JSON.stringify({
        createUser: {
          id: parseInt(profile?.user?.id),
          firstName: profile?.user?.firstName,
          lastName: profile?.user?.lastName,
          gender: parseInt(profile?.user?.gender),
          phone: profile?.user?.phone,
          email: profile?.user?.email,
        },
        major: {
          id: profile?.major?.id,
        },
      }),
      fileAvatar: profile?.user?.avatar || null,
      fileCV: data.cv,
    };
    const headerUser = {
      token : userSessionStorage.token,
      role : profile?.user?.role?.name
    }
    await dispatch(updateUser([headerUser, profileData])).then(()=>{
      setOpens(!opens);
    })
  };
  useEffect(() => {
    dispatch(getAllUserCandidate());
  }, [dispatch]);
  return (
    <div className="profiles">
      <div className="profile_header">
        <img
          style={{ width: 150, height: 150, borderRadius: "50%" }}
          src={
            `${profile?.user?.avatar}` ||
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
              {profile?.user?.lastName} {profile?.user?.firstName}
            </Typography>
          </div>
          <div className="profile_username">
            <h3>@{profile?.user?.username}</h3>
          </div>
          <Divider style={{ padding: 8 }} />
          {profile?.user?.role?.id === 3 ? (
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
              <div className="profile_children_handle">
                <Tooltip title="Thay Đổi CV">
                  <CachedRoundedIcon
                    className="icon-action"
                    onClick={() => handleClick(1)}
                  />
                </Tooltip>
                <Modal
                  modalTitle={"Thay đổi CV"}
                  open={opens}
                  setOpen={setOpens}
                  children={
                    <form
                      onChange={handleChange}
                      style={{
                        width: 300,
                        height: 300,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <InputFile
                        label="CV"
                        requirementField={false}
                        id="cv"
                        format="pdf"
                        setValue={setValue}
                        register={register}
                      >
                      {errors?.cv?.message}
                      </InputFile>
                      <Button onClick={handleSubmit(onSubmit)}>Thay Đổi</Button>
                    </form>
                  }
                  name="Thay Đổi CV"
                  iconClose={<SyncAltIcon />}
                />
              </div>
              <div
                className="profile_children_handle"
                style={{ padding: "0 2rem" }}
              >
                <Tooltip title="Xem CV">
                  <RemoveRedEyeIcon onClick={() => handleClick(2)} />
                </Tooltip>
                <Modal
                  iconClose={true}
                  modalTitle="Xem CV"
                  open={open}
                  setOpen={setOpen}
                  children={
                    <div
                      style={{
                        width: "90vw",
                        height: "90vh",
                        padding: ".5rem",
                      }}
                    >
                      <iframe
                        src={`https://docs.google.com/gview?url=${profile.cv}&embedded=true`}
                        width="100%"
                        height="100%"
                        frameborder="1"
                        title="cv"
                      ></iframe>
                    </div>
                  }
                />
              </div>
              <div className="profile_children_handle">
                <Tooltip title="Tải CV">
                  <a
                    id="downloadLink"
                    href={`${profile?.cv}`}
                    target="_blank"
                    type="application/octet-stream"
                    // download={`${profile?.cv}`}
                    download
                    rel="noreferrer"
                  >
                    <CloudDownloadRoundedIcon />
                  </a>
                </Tooltip>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {profile?.user?.role?.id === 3 ? (
            <div className="profile_click">
              <div className="profile_check">
                <Typography
                  sx={{ marginTop: 0.7 }}
                  variant="overline"
                  display="block"
                  gutterBottom
                >
                  Tìm kiếm việc làm:
                </Typography>
                <Switch
                  checked={checkedFind}
                  onChange={handleChangeFind}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="profile_click">
            <div className="profile_check">
              <Typography
                sx={{ marginTop: 0.7 }}
                variant="overline"
                display="block"
                gutterBottom
              >
                Nhận thông báo về email:
              </Typography>
              <Switch
                sx={{
                  marginBottom: 1,
                }}
                checked={checkedEmail}
                onChange={handleCheckEmail}
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
            name="Vai Trò "
            profile={
              profile?.user?.role?.name === "Role_Candidate"
                ? "Ứng Viên"
                : profile?.user?.role?.name === "Role_HR"
                ? "Nhà Tuyển Dụng"
                : "Cộng Tác Viên"
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

export default Components;
