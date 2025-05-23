"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Upload = () => {
  const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isAuthorized, setAuthorized] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthorized(false);
        return;
      }
      const res = await axios.get(`http://localhost:8000/api/get/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        return;
      }
      console.log(res);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    const selectedCategory = categories.find(
      (category) => category.id === parseInt(categoryId)
    );
    setCategory(categoryId);
    setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
  };


  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthorized(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category_id", category);
    formData.append("subcategory_id", subcategory);
    try {
      setUploading(true);
      const response = await axios.post(
        `http://localhost:8000/api/store/product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUploading(false);
      setUploadStatus(response.data.message);
    } catch (error) {
      setUploading(false);
      setUploadStatus("Error uploading file");
    }
  };

  
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  
  const handleDragLeave = () => {
    setDragging(false);
  };

  
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setUploadStatus(""); 
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">
          Publish to the World
        </h1>
        <p className="text-gray-600 mb-6">
          Presentations, research papers, legal documents, and more
        </p>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-10 mt-6 bg-gray-50"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop} 
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-blue-500 text-white px-6 py-2 text-lg rounded shadow hover:bg-blue-600 cursor-pointer transition duration-200"
          >
            Select Document to Upload
          </label>
          <p className="mt-3 text-gray-500">or drag & drop</p>
        </div>

        {file && (
          <p className="mt-4 text-gray-700">Selected File: {file.name}</p>
        )}

        <div className="mt-6">
          <label className="block text-lg font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            placeholder="Enter product name"
          />
        </div>

        <div className="mt-6">
          <label className="block text-lg font-semibold text-gray-700">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            placeholder="Enter price"
          />
        </div>

        <div className="mt-6">
          <label className="block text-lg font-semibold text-gray-700">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            placeholder="Enter description"
          />
        </div>

        <div className="mt-6">
          <label className="block text-lg font-semibold text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="mt-2 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="mt-2 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleUpload}
          className={`mt-6 bg-green-500 text-white px-6 py-2 text-lg rounded shadow hover:bg-green-600 transition duration-200 ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={uploading}
        >
          {uploading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Uploading...
            </span>
          ) : (
            "Upload File"
          )}
        </button>

        {uploadStatus && (
          <p
            className={`mt-4 text-sm ${
              uploadStatus.startsWith("Error")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default Upload;
