"use client";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            label: "Total",
            data: [1200, 2100, 800, 1600, 900, 1700],
            borderColor: "#8884d8",
            backgroundColor: "rgba(136, 132, 216, 0.4)",
            fill: true,
            tension: 0.4, 
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: "top",
        },
        title: {
            display: true,
            text: "Profit",
        },
    },
    scales: {
        x: {
            grid: {
                drawOnChartArea: false, 
            },
        },
        y: {
            ticks: {
                beginAtZero: true,
            },
        },
    },
};

const ChartEarnings = ({ title }) => {
    return (
        <div className="w-full p-4 bg-white rounded shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-center">{title}</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartEarnings;
