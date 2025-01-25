"use client";
import React, { useState } from "react";
import axios from "axios";

const SettingsFile = () => {
    const [minPrice, setMinPrice] = useState(0);
    const [daysLimit, setDaysLimit] = useState(0);
    const [categoryName, setCategoryName] = useState(""); 
    const [subcategoryName, setSubcategoryName] = useState("");
    const [categoryId, setCategoryId] = useState(""); 

    const handleSave = () => {
        if (minPrice < 0 || daysLimit < 0) {
            alert("Nilai tidak boleh negatif");
            return;
        }

        console.log("Minimal Harga:", minPrice);
        console.log("Batas Hari:", daysLimit);

        alert("Pengaturan berhasil disimpan!");
    };

    const handleAddCategory = async () => {
        if (!categoryName) {
            alert("Nama kategori tidak boleh kosong!");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/store/categories",
                {
                    name: categoryName,
                }
            );

            if (response.status === 200) {
                alert("Kategori berhasil ditambahkan!");
                setCategoryName("");
            }
        } catch (error) {
            alert("Gagal menambahkan kategori!");
            console.error(error);
        }
    };

    const handleAddSubcategory = async () => {
        if (!subcategoryName || !categoryId) {
            alert("Nama subkategori dan kategori ID harus diisi!");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/store/subcategories",
                {
                    name: subcategoryName,
                    category_id: categoryId,
                }
            );

            if (response.status === 200) {
                alert("Subkategori berhasil ditambahkan!");
                setSubcategoryName("");
                setCategoryId("");
            }
        } catch (error) {
            alert("Gagal menambahkan subkategori!");
            console.error(error);
        }
    };

    return (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Settings for Min Price */}
            <div className="relative card w-full bg-[#ffff] drop-shadow-xl p-6">
                <h1 className="text-xl font-bold font-montserrat text-black mb-4">
                    Settings Harga
                </h1>
                <div className="mb-4">
                    <label className="block text-base font-semibold text-gray-700 mb-2">
                        Minimal Harga
                    </label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                        placeholder="Masukkan minimal harga"
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Simpan Pengaturan
                </button>
            </div>

            <div className="relative card w-full bg-[#ffff] drop-shadow-xl p-6">
                <h1 className="text-xl font-bold font-montserrat text-black mb-4">
                    Settings Penghapusan
                </h1>
                <div className="mb-4">
                    <label className="block text-base font-semibold text-gray-700 mb-2">
                        Batas Hari (untuk penghapusan otomatis)
                    </label>
                    <input
                        type="number"
                        value={daysLimit}
                        onChange={(e) => setDaysLimit(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                        placeholder="Masukkan batas hari"
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Simpan Pengaturan
                </button>
            </div>
            <div className="relative card w-full bg-[#ffff] drop-shadow-xl p-6">
                <h1 className="text-xl font-bold font-montserrat text-black mb-4">
                    Add Categories
                </h1>
                <div className="mb-4">
                    <label className="block text-base font-semibold text-gray-700 mb-2">
                        Nama
                    </label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                        placeholder="Masukkan nama kategori"
                    />
                </div>
                <button
                    onClick={handleAddCategory}
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Simpan Kategori
                </button>
            </div>
            <div className="relative card w-full bg-[#ffff] drop-shadow-xl p-6">
                <h1 className="text-xl font-bold font-montserrat text-black mb-4">
                    Add Subcategories
                </h1>
                <div className="mb-4">
                    <label className="block text-base font-semibold text-gray-700 mb-2">
                        Nama Subkategori
                    </label>
                    <input
                        type="text"
                        value={subcategoryName}
                        onChange={(e) => setSubcategoryName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                        placeholder="Masukkan nama subkategori"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-base font-semibold text-gray-700 mb-2">
                        ID Kategori
                    </label>
                    <input
                        type="number"
                        value={categoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                        placeholder="Masukkan kategori ID"
                    />
                </div>
                <button
                    onClick={handleAddSubcategory}
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Simpan Subkategori
                </button>
            </div>
        </div>
    );
};

export default SettingsFile;
