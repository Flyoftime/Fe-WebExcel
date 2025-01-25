"use client";
import { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type }) => {
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [earnings, setEarnings] = useState(0);
    const [loading, setLoading] = useState(true);

    let data = {
        title: "Unknown", // Default title
        isMoney: false,
        link: "No data",
        icon: <AccountBalanceWalletOutlinedIcon className="text-gray-500 bg-gray-200 p-1 rounded" />,
    }; // Default fallback data

    const diff = 20; // Placeholder for the difference percentage

    useEffect(() => {
        // Function to fetch user data
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get/user');
                const data = await response.json();
                setUserCount(data.user ? data.user.length : 0);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUserCount(0);
            }
        };

        // Function to fetch product data
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get/product');
                const data = await response.json();
                setProductCount(data.products ? data.products.length : 0);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setProductCount(0);
            }
        };

        // Function to fetch earnings data
        const fetchEarnings = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/get/orders");
                const data = await response.json();
                const totalEarnings = data.orders ? data.orders.reduce((acc, order) => {
                    const price = parseFloat(order.product?.price || 0);
                    return acc + price;
                }, 0) : 0;
                setEarnings(totalEarnings);
            } catch (error) {
                console.error("Error fetching earnings data:", error);
                setEarnings(0);
            }
        };

        if (type === "user") {
            fetchUserData();
        } else if (type === "product") {
            fetchProducts();
        } else if (type === "earning") {
            fetchEarnings();
        }

        setLoading(false); 
    }, [type]);

    if (type === "user") {
        data = {
            title: "Users",
            isMoney: false,
            link: "See all users",
            icon: <PersonOutlinedIcon className="text-crimson bg-red-200 p-1 rounded" />,
        };
    } else if (type === "product") {
        data = {
            title: "Products",
            isMoney: false,
            link: "View all products",
            icon: <ShoppingCartOutlinedIcon className="text-goldenrod bg-yellow-200 p-1 rounded" />,
        };
    } else if (type === "earning") {
        data = {
            title: "Earnings",
            isMoney: true,
            link: "View earnings",
            icon: <MonetizationOnOutlinedIcon className="text-green-600 bg-green-200 p-1 rounded" />,
        };
    }

    return (
        <div className="flex justify-between flex-1 p-4 shadow-md rounded-lg h-[100px]">
            <div className="flex flex-col justify-between">
                <span className="text-gray-500 font-bold text-sm">{data.title}</span>
                <span className="text-xl text-black">
                    {type === "user" ? userCount : type === "product" ? productCount : earnings}
                </span>
                <span className="text-xs underline text-gray-500">{data.link}</span>
            </div>
        </div>
    );
};

export default Widget;
