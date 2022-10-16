import React, { useState } from "react";
import DoughnutChart from "./DoughnutChart";
import CircularProgressWithLabel from "../../../../components/CircularProgressWithLabel"
import "./styles.scss";

const NumberOfCurrentUsers = () => {
  const [data, setData] = useState([7500, 1500, 3850]);
  return (
    <div className="current-user-container">
      <div className="current-user-wrapper">
        <h3>SỐ LƯỢNG TRUY CẬP HIỆN TẠI</h3>
        <div className="current-user">
          <div className="current-user__item">
            <div className="left">
              <div className="title">Lượt truy cập của ứng viên</div>
              <div className="number">7000/10000</div>
            </div>
            <div className="right">
              <CircularProgressWithLabel value={50} />
            </div>
          </div>
          <div className="current-user__item">
            <div className="left">
              <div className="title">Lượt truy cập của cộng tác viên</div>
              <div className="number">7000/10000</div>
            </div>
            <div className="right"><CircularProgressWithLabel value={15} /></div>
          </div>
          <div className="current-user__item">
            <div className="left">
              <div className="title">Lượt truy cập của nhà tuyển dụng</div>
              <div className="number">7000/10000</div>
            </div>
            <div className="right"><CircularProgressWithLabel value={76} /></div>
          </div>
          <div className="current-user__item">
            <div className="left">
              <div className="title">TỔNG SỐ LƯỢNG TRUY CẬP</div>
              <div className="number">7000/10000</div>
            </div>
            <div className="right"><CircularProgressWithLabel value={66} /></div>
          </div>
        </div>
      </div>
      <div className="current-user-chart">
        <div className="chart-container">
          <DoughnutChart item={data} />
        </div>
      </div>
    </div>
  );
};

export default NumberOfCurrentUsers;
