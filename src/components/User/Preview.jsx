/* eslint-disable react/jsx-key */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useTable } from "react-table";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scale, setScale] = useState(1); // Untuk zoom tabel

    // Ambil data produk dari API Laravel
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/get/product/${id}"); 
            console.log(response.data);
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError("Terjadi kesalahan saat mengambil data");
            setLoading(false);
        }
    };

    // Fungsi untuk export ke file Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(products);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Produk");
        XLSX.writeFile(workbook, "produk.xlsx");
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Setup untuk tabel interaktif dengan React Table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns: [
            {
                Header: "ID",
                accessor: "id", // kolom ID
            },
            {
                Header: "Nama",
                accessor: "name", // kolom Nama
            },
            {
                Header: "Harga",
                accessor: "price", // kolom Harga
            },
            {
                Header: "Deskripsi",
                accessor: "description", // kolom Deskripsi
            },
        ],
        data: products,
    });

    // Zoom fungsi
    const handleZoomIn = () => setScale(scale + 0.1);
    const handleZoomOut = () => setScale(scale - 0.1);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Daftar Produk</h1>


            <div>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
            </div>

            
            <button onClick={exportToExcel} style={{ marginBottom: "20px" }}>
                Export to Excel
            </button>

            
            <div style={{ overflowX: "auto", transform: `scale(${scale})`, transformOrigin: "top left" }}>

                <table {...getTableProps()} border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            // eslint-disable-next-line react/jsx-key
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()} style={{ padding: "8px", textAlign: "center" }}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()} style={{ padding: "8px", textAlign: "center" }}>
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductsPage;