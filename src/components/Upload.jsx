"use client";
import React, { useState, useEffect } from "react";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);

    // Cek otorisasi pengguna
    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const token = localStorage.getItem("token"); // Ambil token dari localStorage
                if (!token) {
                    setIsAuthorized(false);
                    return;
                }

                const response = await fetch("http://localhost:8000/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    setIsAuthorized(data.role_id === 2);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error("Authorization check failed:", error);
                setIsAuthorized(false);
            }
        };

        checkAuthorization();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploadStatus("");
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setUploadStatus("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            setUploadStatus("");
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:8000/api/product/upload", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setUploadStatus("File uploaded successfully!");
                setFile(null);
            } else {
                const errorData = await response.json();
                setUploadStatus(`Error: ${errorData.message || "Failed to upload file."}`);
            }
        } catch (error) {
            setUploadStatus(`Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    if (!isAuthorized) {
        return (
            <div className="text-center font-sans p-8 bg-white">
                <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
                <p className="text-gray-600 text-lg">
                    You do not have the necessary permissions to upload files. Only sellers (role_id: 2) can upload.
                </p>
            </div>
        );
    }

    return (
        <div className="text-center font-sans p-8 bg-white">
            <h1 className="text-2xl font-bold mb-2">Publish to the World</h1>
            <p className="text-gray-600 text-lg">
                Presentations, research papers, legal documents, and more
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 mt-6 bg-gray-50 w-3/4 mx-auto">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="bg-blue-500 text-white px-6 py-2 text-lg rounded shadow hover:bg-blue-600 cursor-pointer"
                >
                    Select Document to Upload
                </label>
                <p className="mt-3 text-gray-500">or drag & drop</p>
            </div>

            {file && (
                <p className="mt-4 text-gray-700">Selected File: {file.name}</p>
            )}

            <button
                onClick={handleUpload}
                className={`mt-6 bg-green-500 text-white px-6 py-2 text-lg rounded shadow hover:bg-green-600 ${uploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                disabled={uploading}
            >
                {uploading ? "Uploading..." : "Upload File"}
            </button>

            {uploadStatus && (
                <p
                    className={`mt-4 text-sm ${uploadStatus.startsWith("Error")
                        ? "text-red-500"
                        : "text-green-500"
                        }`}
                >
                    {uploadStatus}
                </p>
            )}

            <p className="mt-6 text-sm text-gray-500">
                Supported file types: pdf, txt, doc, ppt, xls, docx, and more
                <br />
                By uploading, you agree to our{" "}
                <a href="#" className="text-blue-500 hover:underline">
                    Scribd Uploader Agreement
                </a>
                .
            </p>
            <p className="mt-2 text-sm text-gray-500">
                You must own the copyright to any document you share on Scribd.
                You can read more about this in our{" "}
                <a href="#" className="text-blue-500 hover:underline">
                    Copyright FAQs
                </a>
                .
            </p>
        </div>
    );
};

export default Upload;
