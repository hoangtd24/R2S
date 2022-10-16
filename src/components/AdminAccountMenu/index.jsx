import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import SettingsApplicationsSharpIcon from "@mui/icons-material/SettingsApplicationsSharp";
import Divider from "@mui/material/Divider";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { toast } from "react-toastify";
import {Link, useNavigate} from "react-router-dom"

const AdminAccountMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    sessionStorage.removeItem("userPresent");
    sessionStorage.removeItem("userPresent");
    navigate("/")
    toast.warning("Bạn vừa đăng xuất", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "dark",
    });
  };
  return (
    <>
      <SettingsOutlinedIcon
        className="admin-navbar__icon"
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      />

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 22,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link style={{ color: "#111111" }} to="setting">
          <MenuItem>
            <SettingsApplicationsSharpIcon className="profile-icon" />
            Cài đặt tài khoản
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Logout
            fontSize="small"
            sx={{ marginRight: "16px", color: "#888" }}
          />
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  );
};

export default AdminAccountMenu;
