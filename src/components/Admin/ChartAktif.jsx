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

const ChartAktif = ({ title }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/get/product");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();

                if (!data.products) {
                    throw new Error("No products data available");
                }

                const groupedData = data.products.reduce((acc, product) => {
                    const month = new Date(product.created_at).toLocaleString("default", {
                        month: "long",
                    });
                    acc[month] = (acc[month] || 0) + 1; 
                    return acc;
                }, {});

                const labels = Object.keys(groupedData); 
                const dataSet = Object.values(groupedData); 

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Products",
                            data: dataSet,
                            borderColor: "#8884d8",
                            backgroundColor: "rgba(136, 132, 216, 0.4)",
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                });
            } catch (error) {
                setError(error.message); 
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
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
                text: title || "Products Overview",
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

    if (error) {
        return <p className="text-center text-red-500">{error}</p>; 
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

export default ChartAktif;
