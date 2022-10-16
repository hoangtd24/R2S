import React from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import LineChart from "./LineChart.jsx"
import "./styles.scss";

const NumberOfNewUsers = () => {
  return (
    <div className="new-user-container">
      <div className="new-user-header">
        <h3>SỐ LƯỢNG NGƯỜI DÙNG MỚI</h3>
      </div>
      <div className="new-user">
        <div className="new-user__item active">
          <div className="title">Số lượng ứng viên mới</div>
          <div className="number">7000</div>
          <div className="value-change">
            <span className="up"><KeyboardDoubleArrowUpIcon fontSize='small'/>10%</span> So với tháng trước
          </div>
        </div>
        <div className="new-user__item">
          <div className="title">Số lượng công tác viên mới</div>
          <div className="number">10000</div>
          <div className="value-change">
          <span className="down"><KeyboardDoubleArrowDownIcon fontSize='small'/>10%</span> So với tháng trước
          </div>
        </div>
        <div className="new-user__item">
          <div className="title">Số lượng nhà tuyển dụng mới</div>
          <div className="number">5000</div>
          <div className="value-change">
            <span className="down"><KeyboardDoubleArrowDownIcon fontSize='small'/>15%</span> So với tháng trước
          </div>
        </div>
      </div>
      <div className="new-user-chart">
        <div className="chart-container">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default NumberOfNewUsers;
