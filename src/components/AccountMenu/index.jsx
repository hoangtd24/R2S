import "./styles.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsApplicationsSharpIcon from "@mui/icons-material/SettingsApplicationsSharp";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateRole } from "src/store/slices/main/user/userSlice";

const AccountMenu = ({ linkImg }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {user } = useSelector(state=>state.profile)
  const username = user?.user?.username

  const handleLogout = () => {
    sessionStorage.removeItem("userPresent");
    localStorage.removeItem("userPresent");
    dispatch(updateRole())
    toast.warning("Bạn vừa đăng xuất", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Cài đặt tài khoản">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 , padding: 0}}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 45, height: 45, background: "transparent" }}>
              <img src={linkImg} alt="Ảnh đại diện" className="avatar__image" />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
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
        <h4 className="title-signed">
          Đã đăng nhập với <span>{username}</span>
        </h4>
        <Divider />
        <Link
          style={{ color: "#111111" }}
          to="profile"
        >
          <MenuItem>
            <AccountBoxIcon className="profile-icon" /> Thông tin cá nhân
          </MenuItem>
        </Link>
        <Link style={{ color: "#111111" }} to="setting">
          <MenuItem>
            <SettingsApplicationsSharpIcon className="profile-icon" />
            Cài đặt tài khoản
          </MenuItem>
        </Link>
        <Divider />
        <Link style={{ color: "#111111" }} to="/" replace={true}>
          <MenuItem onClick={handleLogout}>
            <Logout
              fontSize="small"
              sx={{ marginRight: "16px", color: "#888" }}
            />
            Đăng xuất
          </MenuItem>
        </Link>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
