'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

const Sidebar = ({ data }) => {
    const [products, setProducts] = useState([]);
    const productId = window.location.pathname.split('/').pop(); // Ambil ID dari URL

    console.log(`Data dari server: ${data}`);

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
            // Menggunakan productId, bukan id
            const response = await axios.get(
                `http://localhost:8000/api/get/productExcel/${productId}`,
                { responseType: 'arraybuffer' } // Unduh file dalam bentuk array buffer
            );

            // B file Excel menggunakan SheetJSaca
            const workbook = XLSX.read(response.data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const tableColumn = Object.keys(jsonData[0]); // Header tabel dari Excel
            const tableRows = jsonData.map(row => tableColumn.map(col => row[col]));

            // Tambahkan judul di PDF
            doc.setFontSize(16);
            doc.text(`Product Data - ${products.name}`, pageWidth / 2, 10, { align: 'center' });

            // Tambahkan tabel ke PDF
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 20,
                margin: { top: 10, left: 10, right: 10 },
            });

            // Unduh file PDF
            doc.save(`product_${productId}.pdf`);
        } catch (error) {
            console.error("Error downloading and converting Excel to PDF:", error);
        }
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
