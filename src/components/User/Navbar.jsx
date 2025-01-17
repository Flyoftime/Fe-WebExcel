"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { signOut, getSession } from "next-auth/react";
import axios from "axios";
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch session on mount
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const session = await getSession();
                if (session) {
                    setIsLoggedIn(true);
                    setName(session.user.name || "User");
                } else {
                    setIsLoggedIn(false);
                    setName("");
                }
            } catch (err) {
                console.error("Failed to fetch session:", err.message);
            }
        };

        fetchSession();
    }, []);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:8000/api/get/categories"); // Ganti URL sesuai dengan endpoint Anda
                setCategories(response.data.categories || []); // Pastikan API mengembalikan data dengan format yang benar
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch categories");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleLogout = () => {
        signOut({ callbackUrl: "/login" });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <nav className="navbar bg-base-100 shadow-md px-4">
            <div className="flex items-center justify-between w-full">
                {/* Logo */}
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost normal-case text-xl">
                        MyApp
                    </Link>
                </div>

                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="form-control flex items-center relative mr-4"
                >
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered pl-10 w-48 md:w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                {/* Categories */}
                <ul className="menu menu-horizontal px-4 space-x-4">
                    {isLoading ? (
                        <li>Loading...</li>
                    ) : error ? (
                        <li className="text-red-500">{error}</li>
                    ) : (
                        categories.slice(0, 3).map((category) => (
                            <li key={category.id} className="relative group">
                                <button className="hover:text-primary inline-flex items-center">
                                    {category.name} <ChevronDownIcon className="h-4 w-4 ml-1" />
                                </button>
                                <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-2 mt-2">
                                    {category.subcategories.map((subcategory) => (
                                        <li key={subcategory.id}>
                                            <Link
                                                href={`/category/${subcategory.name.toLowerCase().replace(/\s+/g, "-")}`}
                                                className="block px-4 py-2 hover:bg-gray-100"
                                            >
                                                {subcategory.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))
                    )}
                    <li>
                        <Link href="/categories">
                            <button className="hover:text-primary">All Categories</button>
                        </Link>
                    </li>
                </ul>

                {/* Login / Logout */}
                {isLoggedIn ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost cursor-pointer">
                            <div className=" truncate">{name}</div>
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
                                <Link href="/upload">
                                    <button className="block text-black">Upload</button>
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
                        <button className="hover:text-gray-600">Login</button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
