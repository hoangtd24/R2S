import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({item}) => {
  
  var data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of votes",
        data: item,
        backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
        ],
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 10,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
