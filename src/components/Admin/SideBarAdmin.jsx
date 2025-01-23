"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Sidebar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const router = useRouter();


    const handleLogout = () => {
        signOut({ callbackUrl: "/login" });
    };


    return (
        <div className="flex">
            <div className="border-r-[0.5px] border-gray-300 h-screen bg-white">
                <div className="h-[50px] flex items-center justify-center">
                    <Link href="/" className="no-underline">
                        <button className="text-lg font-bold text-purple-700">admin</button>
                    </Link>
                </div>
                <hr className="border-0.5 border-gray-300" />
                <div className="pl-2">
                    <ul className="list-none m-0 p-0">
                        <Link href="/admin">
                            <p className="text-[10px] font-bold text-gray-500 mt-4 mb-2">MAIN</p>
                            <li className="flex items-center p-1 cursor-pointer hover:bg-purple-100">
                                <DashboardIcon className="text-lg text-purple-600" />
                                <span className="text-sm font-semibold text-gray-500 ml-2">Dashboard</span>
                            </li>
                        </Link>
                        <p className="text-[10px] font-bold text-gray-500 mt-4 mb-2">LISTS</p>
                        <Link href="/admin/user">
                            <button className="flex items-center p-1 cursor-pointer hover:bg-purple-100 no-underline">
                                <PersonOutlineIcon className="text-lg text-purple-600" />
                                <span className="text-sm font-semibold text-gray-500 ml-2">Users</span>
                            </button>
                        </Link>
                        <Link href="/admin/products">
                            <button className="flex items-center p-1 cursor-pointer hover:bg-purple-100 no-underline">
                                <StoreIcon className="text-lg text-purple-600" />
                                <span className="text-sm font-semibold text-gray-500 ml-2">Products</span>
                            </button>
                        </Link>

                        <p className="text-[10px] font-bold text-gray-500 mt-4 mb-2">USEFUL</p>
                        <Link href="/admin/chart">
                            <li className="flex items-center p-1 cursor-pointer hover:bg-purple-100">
                                <InsertChartIcon className="text-lg text-purple-600" />
                                <span className="text-sm font-semibold text-gray-500 ml-2">Stats</span>
                            </li>
                        </Link>
                        <li className="flex items-center p-1 cursor-pointer hover:bg-purple-100">
                            <NotificationsNoneIcon className="text-lg text-purple-600" />
                            <span className="text-sm font-semibold text-gray-500 ml-2">Notifications</span>
                        </li>
                        <p className="text-[10px] font-bold text-gray-500 mt-4 mb-2">SERVICE</p>
                        <Link href="/admin/settings">
                            <li className="flex items-center p-1 cursor-pointer hover:bg-purple-100">
                                <SettingsApplicationsIcon className="text-lg text-purple-600" />
                                <span className="text-sm font-semibold text-gray-500 ml-2">Settings</span>
                            </li>
                        </Link>
                        <p className="text-[10px] font-bold text-gray-500 mt-4 mb-2">USER</p>
                        <li className="flex items-center p-1 cursor-pointer hover:bg-purple-100">
                            <AccountCircleOutlinedIcon className="text-lg text-purple-600" />
                            <span className="text-sm font-semibold text-gray-500 ml-2">Profile</span>
                        </li>
                        {/* Logout Button */}
                        <li
                            onClick={handleLogout}
                            className="flex items-center p-1 cursor-pointer hover:bg-purple-100"
                        >
                            <ExitToAppIcon className="text-lg text-purple-600" />
                            <span className="text-sm font-semibold text-gray-500 ml-2">Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
