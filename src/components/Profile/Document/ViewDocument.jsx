/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Preview from "./Preview";

const ViewDocument = ({ params }) => {
    const id = params.productid;

    // State Management
    const [product, setProduct] = useState(null); // Default null untuk validasi lebih jelas
    const [HTML, setHTML] = useState("");
    const [loading, setLoading] = useState(true); // State untuk loading

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/get/product/{id}/download-pdf`);
                setProduct(response.data.products);
            } catch (error) {
                console.error("Error fetching product data:", error);
                alert("Failed to fetch product data. Please try again.");
            } finally {
                setLoading(false); // Matikan loading setelah proses selesai
            }
        };
        fetchProduct();
    }, [id]); // `id` sebagai dependensi

    // Fetch and convert Excel to HTML
    useEffect(() => {
        if (product && product.excel_file_url) {
            const fetchExcelFile = async () => {
                try {
                    const response = await axios.get(product.excel_file_url, { responseType: "arraybuffer" });
                    const workbook = XLSX.read(response.data, { type: "array" });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const html = XLSX.utils.sheet_to_html(worksheet);
                    setHTML(html);
                } catch (error) {
                    console.error("Error fetching and converting Excel file:", error);
                    alert("Failed to load Excel file. Please check the file or try again.");
                }
            };
            fetchExcelFile();
        }
    }, [product]); // `product` sebagai dependensi

    // Show loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Show error state if no product data
    if (!product) {
        return <div>Error loading product data. Please try again.</div>;
    }

    return (
        <div>
            <h3>Excel Data for Product: {product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <p>
                Excel File:{" "}
                <a
                    href={product.excel_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Download Excel
                </a>
            </p>
            {/* Render HTML if it exists */}
            {HTML ? <div dangerouslySetInnerHTML={{ __html: HTML }} /> : <p>No Excel data to display.</p>}
            <Preview />
        </div>
    );
};

export default ViewDocument;
