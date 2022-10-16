import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const LineChart = () => {
    var data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Nhà tuyển dụng",
                data: [130, 170, 50, 266, 204, 304, 245, 89, 109, 234, 111, 234],
                borderColor: "#04bf8a",
                borderWidth: 1,
                pointBackgroundColor: '#04bf8a',
            },
            {
                label: "Cộng tác viên",
                data: [381, 321, 382, 225, 437, 187, 333, 262, 408, 380, 335, 198],
                borderColor: "#f4c150",
                borderWidth: 1,
                pointBackgroundColor: '#f4c150',
            },
        ],
    };

    var options = {
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                    color: 'black',
                    padding: 15,
                },
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
