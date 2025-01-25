"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";

const TableUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/get/user")
            .then((response) => {
                setUsers(response.data.user || []);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch users");
                setLoading(false);
            });
    }, []);

    const handleRoleChange = (Id, newRole) => {
        if (!["User", "Seller", "Admin"].includes(newRole)) {
            setError("Invalid role value");
            return;
        }

        axios
            .put(`http://localhost:8000/api/user/${Id}/edit`, { role: newRole })
            .then(() => {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === Id ? { ...user, role: newRole } : user
                    )
                );
            })
            .catch(() => {
                setError("Failed to update role");
            });
    };

    return (
        <TableContainer component={Paper} className="shadow-md p-4">
            <Table sx={{ minWidth: 650 }} aria-label="user table">
                <TableHead>
                    <TableRow>
                        <TableCell className="font-bold">No</TableCell>
                        <TableCell className="font-bold">Name</TableCell>
                        <TableCell className="font-bold">Email</TableCell>
                        <TableCell className="font-bold">Password</TableCell>
                        <TableCell className="font-bold">Role</TableCell>
                        <TableCell className="font-bold">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                Loading...
                            </TableCell>
                        </TableRow>
                    ) : error ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" style={{ color: "red" }}>
                                {error}
                            </TableCell>
                        </TableRow>
                    ) : users.length > 0 ? (
                        users.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name || "N/A"}</TableCell>
                                <TableCell>{user.email || "N/A"}</TableCell>
                                <TableCell>{user.password || "N/A"}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded text-sm ${
                                            user.role === "Admin"
                                                ? "text-blue-600 bg-blue-100"
                                                : user.role === "Seller"
                                                ? "text-purple-600 bg-purple-100"
                                                : "text-gray-600 bg-gray-100"
                                        }`}
                                    >
                                        {user.role || "N/A"}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <InputLabel>Role</InputLabel>
                                        <Select
                                            value={user.role || ""}
                                            onChange={(e) =>
                                                handleRoleChange(user.id, e.target.value)
                                            }
                                        >
                                            <MenuItem value="User">User</MenuItem>
                                            <MenuItem value="Seller">Seller</MenuItem>
                                            <MenuItem value="Admin">Admin</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                No users found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableUser;
