'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Sidebar = () => {
    const [product, setProduct] = useState(null);
    const productId = window.location.pathname.split('/').pop(); 

    // Fetch Product Data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/get/product/${productId}`);
                console.log("Fetched Product:", response.data);
                setProduct(response.data.products || {});
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProduct();
    }, [productId]);

    const formatDate = (isoDate) => {
        if (!isoDate) return "Unknown";
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };


    const handleDownloadExcelAsPDF = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/get/product/${productId}/download-pdf`,
                { responseType: 'arraybuffer' } 
            );

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `product_${productId}.pdf`;
            link.click();
        } catch (error) {
            console.error("Error downloading and converting Excel to PDF:", error);
            alert("Failed to download and convert Excel to PDF. Please try again.");
        }
    };


    return (
        <div className="fixed top-[68px] left-0 h-[calc(100vh-68px)] w-64 bg-white shadow-md p-6">
            <h1 className="text-2xl font-bold mb-2 text-black">
                {product?.name || "Loading..."}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
                Created on: {formatDate(product?.created_at)}
            </p>
            <p className="text-sm text-gray-700 mb-4">
                {product?.description || "No description available."}
            </p>
            <div className="flex flex-col space-y-4">
                <div className="text-center">
                    <i className="fas fa-download text-gray-500"></i>
                    <p
                        className="text-xs text-gray-500 cursor-pointer"
                        onClick={handleDownloadExcelAsPDF}
                    >
                        Download Excel as PDF
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
