import React from "react";
import LineChart from "./LineChart";
import "./styles.scss";

const TotalStatistic = () => {
  return (
    <div className="total-statistic-container">
      <h3>Tổng số lượng</h3>
      <div className="amount-wrapper">
        <div className="amount-item">
          <p>Bài đăng của nhà tuyển dụng</p>
          <h2>128</h2>
        </div>
        <div className="amount-item">
          <p>Bài đăng của cộng tác viên</p>
          <h2>100</h2>
        </div>
        <div className="amount-item">
          <p>Ứng viên đã ứng tuyển</p>
          <h2>208</h2>
        </div>
      </div>
      <div className="total-statistic-chart">
        <h3>Số lượng bài đăng mới</h3>
        <LineChart />
      </div>
    </div>
  );
};

export default TotalStatistic;
