"use client";
import React, { useState, useEffect } from "react";

const YourProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        password: "",
        email: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        name: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("User is not authenticated");
                }

                const response = await fetch("http://localhost:8000/api/get/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }

                const data = await response.json();
                setProfile(data); // Update profile dengan data dari server
                setEditedProfile({ name: data.name, password: "" }); // Set nama dan kosongkan password untuk editing
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("User is not authenticated");
            }

            const response = await fetch("http://localhost:8000/api/user/{id}/edit", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editedProfile),
            });

            if (!response.ok) {
                throw new Error("Failed to save user profile");
            }

            setProfile({ ...profile, ...editedProfile }); 
            setIsEditing(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile({ ...editedProfile, [name]: value });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="max-w-md mx-auto font-sans">
            {isEditing ? (
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={editedProfile.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-white text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={editedProfile.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-white text-black"
                        />
                    </div>
                    <button
                        onClick={handleSaveClick}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
                    >
                        Save
                    </button>
                </div>
            ) : (
                <div>
                    <div className="mb-4 bg-white">
                        <h3 className="text-lg font-medium">Name</h3>
                        <p className="text-gray-600 ">{profile.name}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium">Email</h3>
                        <p className="text-gray-600">{profile.email}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium">Password</h3>
                        <p className="text-gray-600">******</p>
                    </div>
                    <button
                        onClick={handleEditClick}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default YourProfile;
