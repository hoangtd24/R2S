import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Hidden } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./styles.scss";
import CustomLink from "../CustomLink";

const sidebarLink = [
  {
    title: "Tổng quan",
    list: [
      {
        id: 1,
        to: "",
        name: "Dashboard",
        icon: AppsOutlinedIcon,
      },
      {
        id: 2,
        to: "statistical",
        name: "Thống kê",
        icon: AnalyticsOutlinedIcon,
      },
    ],
  },
  {
    title: "Quản lý chung",
    list: [
      {
        id: 3,
        to: "user",
        name: "Tài khoản",
        icon: AccountCircleOutlinedIcon,
      },
      {
        id: 4,
        to: "university",
        name: "Trường học",
        icon: SchoolOutlinedIcon,
      },
      {
        id: 5,
        to: "company",
        name: "Công ty",
        icon: BusinessOutlinedIcon,
      },
      {
        id: 6,
        to: "demand",
        name: "Nhu cầu",
        icon: ArticleOutlinedIcon,
      },
    ],
  },
  {
    title: "Khác",
    list: [
      {
        id: 7,
        to: "major",
        name: "Chuyên ngành",
        icon: AccountCircleIcon,
      },
    ],
  },
];

const Sidebar = () => {
  // render list link
  const renderListLink = (list) => {
    return list.map((item) => {
      return (
        <CustomLink to={item.to} key={item.id}>
          <div className="sidebar__link">
            <item.icon className="sidebar__icon" />
            <p>{item.name}</p>
          </div>
        </CustomLink>
      );
    });
  };

  // render sidebar item
  const renderSideberLink = () => {
    return sidebarLink.map((item) => {
      const { title, list } = item;
      return (
        <div key={title}>
          <h5>{title}</h5>
          {renderListLink(list)}
        </div>
      );
    });
  };

  return (
    <div className="sidebar">
      <Hidden mdUp>
        <div className="sidebar-logo">
          <h2>ITInternshipJob</h2>
        </div>
      </Hidden>
      <ul>{renderSideberLink()}</ul>
    </div>
  );
};

export default Sidebar;
