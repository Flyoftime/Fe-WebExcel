"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Search from "./Navbar/Search";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const categories = [
        {
            name: "Academic",
            subcategories: ["Science", "Math", "History"],
        },
        {
            name: "Professional",
            subcategories: ["Business", "Technology", "Leadership"],
        },
        {
            name: "Culture",
            subcategories: ["Art", "Music", "Literature"],
        },
        {
            name: "Hobbies & Crafts",
            subcategories: ["DIY", "Photography", "Gardening"],
        },
        {
            name: "Personal Growth",
            subcategories: ["Self-help", "Fitness", "Meditation"],
        },
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar bg-base-100 shadow-md px-4">
            <div className="flex items-center justify-between w-full">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="btn btn-ghost normal-case text-xl">
                        MyApp
                    </Link>
                </div>

                <div className="hidden md:flex items-center">
                    <Search />
                    <div className="hidden md:flex items-center">
                        <ul className="menu menu-horizontal px-4 space-x-4">
                            {categories.slice(0, 3).map((category) => (
                                <li key={category.name} className="relative group">
                                    <button className="hover:text-primary inline-flex items-center">
                                        {category.name} <ChevronDownIcon className="h-4 w-4 ml-1" />
                                    </button>
                                    <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-2 mt-2">
                                        {category.subcategories.map((subcategory) => (
                                            <li key={subcategory}>
                                                <Link href={`/category/${subcategory.toLowerCase()}`}>
                                                    <button className="block px-4 py-2 hover:bg-gray-100">
                                                        {subcategory}
                                                    </button>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                            <li>
                                <Link href="/categories">
                                    <button className="hover:text-primary">All Categories</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {isLoggedIn ? (
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar cursor-pointer"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        alt="User Avatar"
                                    />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-lg mt-3 w-52"
                            >
                                <li>
                                    <Link href="/profile">
                                        <button className="block text-black">Profile</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/settings">
                                        <button className="block text-black">Settings</button>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="block text-black">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="btn btn-primary">Login</button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="btn btn-ghost btn-circle md:hidden"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                >
                    {isDrawerOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>
            </div>

            
            {isDrawerOpen && (
                <div className="absolute top-16 left-0 w-full bg-base-100 shadow-md z-50">
                    <form onSubmit={handleSearch} className="flex items-center p-4">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                    <ul className="menu p-4 space-y-2">
                        {categories.map((category) => (
                            <li key={category.name}>
                                <button className="w-full text-left">{category.name}</button>
                                <ul className="pl-4">
                                    {category.subcategories.map((subcategory) => (
                                        <li key={subcategory}>
                                            <Link href={`/category/${subcategory.toLowerCase()}`}>
                                                <button className="w-full text-left">
                                                    {subcategory}
                                                </button>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                        <li>
                            <Link href="/categories">
                                <button className="w-full text-left">All Categories</button>
                            </Link>
                        </li>
                    </ul>
                    <div className="p-4 border-t">
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="btn btn-block btn-error"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link href="/login">
                                <button className="btn btn-block btn-primary">Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
