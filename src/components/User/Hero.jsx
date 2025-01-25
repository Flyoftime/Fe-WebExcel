"use client";
import React, { useEffect, useState } from "react";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/get/categories");
                const data = await response.json();
                if (data && data.categories) {
                    setCategories(data.categories);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p className="text-center">Loading categories...</p>;

    if (!categories || categories.length === 0) {
        return <p className="text-center">No categories available</p>;
    }

    return (
        <div className="py-16 bg-white">
            <div className="container">
                <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8">
                    Browse popular categories
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex flex-col items-center gap-2 p-4 bg-white  rounded-lg shadow-md hover:shadow-lg transition duration-200"
                        >
                            <div className="w-24 h-24 flex justify-center items-center bg-green-100 rounded-full">
                                <img
                                    src="/icons/excel.png" 
                                    alt="Excel Icon"
                                    className="w-16 h-16 object-contain"
                                />
                            </div>
                            <h3 className="text-center font-semibold">{category.name}</h3>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <a
                        href="/categories"
                        className="text-primary hover:underline"
                    >
                        See all categories
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Categories;
