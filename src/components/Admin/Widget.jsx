"use client";
import { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type }) => {
    const [userCount, setUserCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products,setProducts] = useState([]);

    let data;

    const amount = 100;
    const diff = 20;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get/user');
                const data = await response.json();
                console.log("Fetched data:", data); 

                if (data.user) {
                    setUserCount(data.user.length);  
                } else {
                    console.error("Data users tidak ditemukan!");
                    setUserCount(0);  
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUserCount(0);  
            } finally {
                setLoading(false);  
            }
        };

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/get/product');
            const data = await response.json();
            console.log("Fetched Products:", data);
            setProducts(data.products || []); // Pastikan data berupa array
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

        if (type === "order") {
            fetchProducts();
        }

        if (type === "user") {
            fetchUserData();
        }
    }, [type]);

    switch (type) {
        case "user":
            data = {
                title: "Users",
                isMoney: false,
                link: "See all users",
                icon: (
                    <PersonOutlinedIcon
                        className="text-crimson bg-red-200 p-1 rounded"
                    />
                ),
            };
            break;
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                link: "View all orders",
                icon: (
                    <ShoppingCartOutlinedIcon
                        className="text-goldenrod bg-yellow-200 p-1 rounded"
                    />
                ),
            };
            break;
        case "earning":
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "View net earnings",
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="text-green-600 bg-green-200 p-1 rounded"
                    />
                ),
            };
            break;
        case "balance":
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "See details",
                icon: (
                    <AccountBalanceWalletOutlinedIcon
                        className="text-purple-600 bg-purple-200 p-1 rounded"
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="flex justify-between flex-1 p-4 shadow-md rounded-lg h-[100px]">
            <div className="flex flex-col justify-between">
                <span className="text-gray-500 font-bold text-sm">{data.title}</span>
                <span className="text-xl text-black">
                    {userCount && type === "user" ? userCount : products.length && type === "order" ? products.length : products}
                </span>
                <span className="text-xs underline text-gray-500">{data.link}</span>
            </div>
            <div className="flex flex-col justify-between items-end">
                <div className={`flex items-center text-sm ${diff > 0 ? "text-green-600" : "text-red-600"}`}>
                    <KeyboardArrowUpIcon />
                    {diff} %
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
