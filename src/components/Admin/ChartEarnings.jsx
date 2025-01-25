"use client";
import React, { useState, useEffect } from "react";
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

const ChartEarnings = ({ title }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/get/orders");
                const data = await response.json();

                const orders = data.orders || [];

                const groupedData = orders.reduce((acc, order) => {
                    const month = new Date(order.created_at).toLocaleString("default", {
                        month: "long",
                    });
                    const price = parseFloat(order.product?.price || 0); 

                    acc[month] = (acc[month] || 0) + price;
                    return acc;
                }, {});

                const labels = Object.keys(groupedData); 
                const dataSet = Object.values(groupedData); 

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Total Earnings",
                            data: dataSet,
                            borderColor: "#8884d8",
                            backgroundColor: "rgba(136, 132, 216, 0.4)",
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (!chartData) {
        return <p className="text-center">No data available</p>;
    }

    return (
        <div className="w-full p-4 bg-white rounded shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-center">{title}</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ChartEarnings;
