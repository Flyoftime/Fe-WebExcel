"use client";

import React, { useEffect, useState } from "react";

const RecomendationPage = ({ data }) => {
    const [products, setProducts] = useState([]);

    console.log(`Data dari server: ${data}`);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/get/product");
                const data = await response.json();
                console.log("Fetched Products:", data);
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductSelect = (productId) => {
        console.log("Selected Product ID:", productId);
        window.location = `/products/${productId}`;
    };

    return (
        <div className="bg-white">
            <h2 className="text-xl font-bold mb-4">For You</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Array.isArray(products) &&
                    products.map((product, index) => (
                        <div
                            key={product.id || index}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                            onClick={() => handleProductSelect(product.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="p-4">
                                <div className="h-32  flex items-center justify-center mb-4">
                                    <img
                                        src="/icons/excel.png"
                                        alt="Excel Icon"
                                        className="h-16 w-16 object-contain"
                                    />
                                </div>
                                <p className="text-sm font-medium mb-1 text-gray-500">
                                    {product.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Category: {product.category.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Created By : {product.user.name}
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                    
                                    <button>
                                        <i className="far fa-bookmark text-gray-500"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RecomendationPage;
