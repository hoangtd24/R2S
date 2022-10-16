import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const LineChart = () => {
  var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Number",
        data: [130, 170, 50, 266, 204, 304, 445],
        backgroundColor: "rgba(4, 191, 138, 0.2)",
        borderColor: "#04bf8a",
        fill: true,
        tension: 0.2,
      },
    ],
  };

  var options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
