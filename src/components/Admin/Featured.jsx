'use client'

import { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [targetRevenue, setTargetRevenue] = useState(12400); 
    const [lastWeekRevenue, setLastWeekRevenue] = useState(0);
    const [lastMonthRevenue, setLastMonthRevenue] = useState(0);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get/orders');
                const data = await response.json();
                const orders = data.orders || [];

                let todayRevenue = 0;
                let lastWeekRevenue = 0;
                let lastMonthRevenue = 0;

                const now = new Date();

                orders.forEach(order => {
                    const orderDate = new Date(order.created_at);
                    const price = parseFloat(order.product?.price || 0);

                    if (orderDate.toDateString() === now.toDateString()) {
                        todayRevenue += price;
                    }

                    const lastWeekDate = new Date(now);
                    lastWeekDate.setDate(now.getDate() - 7);
                    if (orderDate > lastWeekDate) {
                        lastWeekRevenue += price;
                    }

                    const lastMonthDate = new Date(now);
                    lastMonthDate.setMonth(now.getMonth() - 1);
                    if (orderDate > lastMonthDate) {
                        lastMonthRevenue += price;
                    }
                });

                setTotalRevenue(todayRevenue);
                setLastWeekRevenue(lastWeekRevenue);
                setLastMonthRevenue(lastMonthRevenue);
            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        };

        fetchRevenueData();
    }, []);

    return (
        <div className="flex-[2] shadow-md p-4">
            <div className="flex items-center justify-between text-gray-500">
                <h1 className="text-lg font-medium">Total Revenue</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 p-5">
                <div className="w-24 h-24">
                    <div className="radial-progress" style={{ "--value": (totalRevenue / targetRevenue) * 100 }} role="progressbar">
                        {(totalRevenue / targetRevenue) * 100}%
                    </div>
                </div>
                <p className="font-medium text-gray-500">Total sales made today</p>
                <p className="text-2xl">${totalRevenue}</p>
                <p className="text-center text-sm font-light text-gray-500">
                    Previous transactions processing. Last payments may not be included.
                </p>
                <div className="w-full flex items-center justify-between">
                    <div className="text-center">
                        <div className="text-sm text-gray-500">Target</div>
                        <div className="flex items-center mt-2 text-sm text-red-500">
                            <KeyboardArrowDownIcon fontSize="small" />
                            <div className="ml-1">${targetRevenue}</div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-500">Last Week</div>
                        <div className="flex items-center mt-2 text-sm text-green-500">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="ml-1">${lastWeekRevenue}</div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-500">Last Month</div>
                        <div className="flex items-center mt-2 text-sm text-green-500">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="ml-1">${lastMonthRevenue}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
