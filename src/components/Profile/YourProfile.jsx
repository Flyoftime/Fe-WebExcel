"use client";
import React, { useState } from 'react';

const YourProfile = () => {
    const [profile, setProfile] = useState({
        fullName: "Mochamad Mirsab Anwar",
        username: "mirzamirsab",
        email: "MochamadMirsab@email.com",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(profile);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setProfile(editedProfile);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile({ ...editedProfile, [name]: value });
    };

    return (
        <div className="max-w-md mx-auto font-sans">
            {isEditing ? (
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={editedProfile.fullName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={editedProfile.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={editedProfile.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
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
                    <div className="mb-4">
                        <h3 className="text-lg font-medium">Full Name</h3>
                        <p className="text-gray-600">{profile.fullName}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium">Username</h3>
                        <p className="text-gray-600">{profile.username}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium">Email</h3>
                        <p className="text-gray-600">{profile.email}</p>
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
