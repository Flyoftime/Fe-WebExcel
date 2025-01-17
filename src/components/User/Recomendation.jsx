"use client";

import React, { useEffect, useState } from "react";

const RecomendationPage = ({ data }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/get/product");
                const data = await response.json();
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
        <div className="bg-gray-100 px-4 py-6">
            <h2 className="text-2xl font-bold mb-6">For You</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Array.isArray(products) &&
                    products.map((product, index) => (
                        <div
                            key={product.id || index}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                            onClick={() => handleProductSelect(product.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="relative">
                                
                                <div className="h-40 bg-gray-200 flex items-center justify-center">
                                    <span className="text-lg font-semibold text-gray-500">Execl</span>
                                </div>
                                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                    Xlxs
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-base font-semibold text-gray-800 mb-1 truncate">
                                    {product.name}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">
                                    Added by {product.addedBy || "Unknown"}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Category: {product.category.name || "N/A"}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RecomendationPage;
