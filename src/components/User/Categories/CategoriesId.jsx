"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoriesId = ({ name }) => {
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!name) {
                console.error("Category name is undefined.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/api/categories/${name}/products`);
                console.log("API Response:", response.data);
                setProducts(response.data.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]); 
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [name]);

    useEffect(() => {
        if (products.length > 0) {
            const grouped = products.reduce((acc, product) => {
                const categoriesName = product.categories?.name || "Uncategorized";
                if (!acc[categoriesName]) {
                    acc[categoriesName] = [];
                }
                acc[categoriesName].push(product);
                return acc;
            }, {});

            setSortedProducts(grouped);
        } else {
            setSortedProducts({});
        }
    }, [products]);

    const handleProductSelect = (productId) => {
        console.log("Selected Product ID:", productId);
        window.location = `/products/${productId}`;
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <div className="bg-white px-4 py-8">
            <h2 className="text-xl font-bold mb-4 text-center">For You</h2>
            {Object.keys(sortedProducts).length === 0 ? (
                <p className="text-center text-gray-500">No products available for this category.</p>
            ) : (
                Object.keys(sortedProducts).map((categories) => (
                    <div key={categories} className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">{categories}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {sortedProducts[categories].map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white shadow-md rounded-lg overflow-hidden"
                                    onClick={() => handleProductSelect(product.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="p-4">
                                        <div className="h-32 bg-gray-200 flex items-center justify-center mb-4">
                                            <span className="text-sm text-gray-500">PDF</span>
                                        </div>
                                        <p className="text-sm font-medium mb-1 text-gray-500">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Category: {product.categories?.name || "Uncategorized"}
                                        </p>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-sm text-gray-500">
                                                {product.rating ? `${product.rating}%` : "No rating"}
                                            </p>
                                            <button>
                                                <i className="far fa-bookmark text-gray-500"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CategoriesId;
