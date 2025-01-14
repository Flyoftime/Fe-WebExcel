"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Cek login status saat komponen dimuat
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Set true jika token ada
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Hapus token
        setIsLoggedIn(false); // Perbarui status login
    };

    return (
        <div className="navbar bg-base-100 shadow-md">
            {/* Logo Section */}
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">
                    MyApp
                </Link>
            </div>

            {/* Right Section */}
            <div className="flex-none space-x-4">
                {/* Search Bar with Icon */}
                <div className="form-control relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered pl-10 w-24 md:w-auto"
                    />
                </div>

                {/* Upload Button */}
                <Link href="/upload">
                    <button className="flex items-center text-white px-4 py-2 rounded hover:text-gray-600">
                        <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                        Upload
                    </button>
                </Link>

                {/* Login/Avatar Dropdown */}
                {isLoggedIn ? (
                    // Avatar and Dropdown for Logged-In Users
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white"
                        >
                            <li>
                                <Link href="/profile">
                                    <button className="justify-between text-black">
                                        Profile
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/settings">
                                    <button className="text-black">Settings</button>
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-black">Logout</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    // Login Button for Non-Logged-In Users
                    <Link href="/login">
                        <button className="text-white px-4 py-2 rounded hover:text-gray-600">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
