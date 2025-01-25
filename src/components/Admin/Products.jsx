"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Products = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/get/product", {
                    timeout: 5000,
                });
                console.log("API Response:", response.data);
                setRows(response.data.products);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (!Array.isArray(rows) || rows.length === 0) {
        return <p className="text-center">No data available</p>;
    }

    return (
        <TableContainer
            component={Paper}
            className="shadow-md mt-10"
            style={{ maxHeight: "400px", overflowY: "auto" }} 
        >
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell className="font-bold">Name</TableCell>
                        <TableCell className="font-bold">Price</TableCell>
                        <TableCell className="font-bold">Description</TableCell>
                        <TableCell className="font-bold">Category</TableCell>
                        <TableCell className="font-bold">Subcategory</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.category.name}</TableCell>
                            <TableCell>{row.subcategory.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Products;
