import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import './styles.scss'

const PieChart = () => {
  var data = {
    labels: ["Công ty", "Trường học"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  var options = {
    plugins: {
      legend: {
          position: 'bottom',
          align: 'start',
          labels: {
              usePointStyle: true,
              boxWidth: 10,
              color: 'black',
              padding: 15,
          },
      },
  },
  };

  return <Pie data={data} options={options} />;
};

const StatisticPieChart = () => {
  return (
    <div className="statistic-chart-container">
      <h3>Số lượng</h3>
      <div className="chart">
        <PieChart />
      </div>
    </div>
  );
};

export default StatisticPieChart;
