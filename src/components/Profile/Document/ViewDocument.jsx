"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const ViewDocument = ({ params }) => {
    const [excelData, setExcelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId] = useState();
    const [excelUrl, setExcelUrl] = useState(null);

    useEffect(() => {
        if (params?.productid) {
            setId(params.productid);
        }
    }, [params]);

    // Ambil data produk dan URL file Excel dari API
    const fetchProductData = async (productId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get/product/${productId}`);
            const product = response.data.products;

            if (product && product.excel_file_url) {
                setExcelUrl(product.excel_file_url);
                fetchExcelFile(product.excel_file_url); // Ambil dan proses file Excel
            }

            setLoading(false);
        } catch (err) {
            console.error("Error fetching product data:", err);
            setError('Terjadi kesalahan saat mengambil data produk.');
            setLoading(false);
        }
    };

    // Ambil dan baca file Excel
    const fetchExcelFile = async (fileUrl) => {
        try {
            const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
            const data = new Uint8Array(response.data);

            if (data.length === 0) {
                throw new Error("Excel file is empty or invalid");
            }

            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            if (jsonData.length === 0) {
                throw new Error("No data found in the Excel file");
            }

            setExcelData(jsonData);

        } catch (err) {
            console.error("Error reading Excel file:", err);
            setError('Terjadi kesalahan saat memproses file Excel. ' + err.message);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProductData(id);
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Data Excel untuk Produk {id}</h2>
            {excelData && excelData.length > 0 ? (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {Object.keys(excelData[0]).map((header, index) => (
                                <th key={index} style={{ padding: '8px', textAlign: 'center' }}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {excelData.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex} style={{ padding: '8px', textAlign: 'center' }}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No data available in the Excel file.</div>
            )}
        </div>
    );
}

export default ViewDocument;
