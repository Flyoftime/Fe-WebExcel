'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sidebar = ({ data }) => {
    const [products, setProducts] = useState([]);

    console.log(`Data dari server: ${data}`);
    const productId = window.location.pathname.split('/').pop();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/get/product/${productId}`);
                const data = await response.json();
                console.log("Fetched Products:", data);
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    const formatDate = (isoDate) => {
        if (!isoDate) return "Unknown";
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="fixed top-[68px] left-0 h-[calc(100vh-68px)] w-64 bg-white shadow-md p-6">
            <h1 className="text-2xl font-bold mb-2 text-black">
                {products.name}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
            Created on: {formatDate(products.created_at)}
            </p>
            <p className="text-sm text-gray-700 mb-4">
                {products.description}
            </p>
            <div className="flex flex-col space-y-4">
                <div className="text-center">
                    <i className="fas fa-download text-gray-500"></i>
                    <p className="text-xs text-gray-500">Download</p>
                </div>
                <div className="text-center">
                    <i className="fas fa-bookmark text-gray-500"></i>
                    <p className="text-xs text-gray-500">Save</p>
                </div>
                <div className="text-center">
                    <i className="fas fa-thumbs-up text-gray-500"></i>
                    <p className="text-xs text-gray-500">100%</p>
                </div>
                <div className="text-center">
                    <i className="fas fa-thumbs-down text-gray-500"></i>
                    <p className="text-xs text-gray-500">0%</p>
                </div>
                <div className="text-center">
                    <i className="fas fa-code text-gray-500"></i>
                    <p className="text-xs text-gray-500">Embed</p>
                </div>
                <div className="text-center">
                    <i className="fas fa-share-alt text-gray-500"></i>
                    <p className="text-xs text-gray-500">Share</p>
                </div>
                <div className="text-center">
                    <i className="fas fa-print text-gray-500"></i>
                    <p className="text-xs text-gray-500">Print</p>
                </div>
                <div className="text-center">
                    <i className="fas fa-flag text-gray-500"></i>
                    <p className="text-xs text-gray-500">Report</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
