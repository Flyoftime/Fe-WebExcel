'use client';

import React, { useEffect, useState } from 'react';

const LandingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get/product');
        const data = await response.json();
        console.log("Fetched Products:", data);
        setProducts(data.products || []); // Pastikan data berupa array
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">For You</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.isArray(products) && products.map((product, index) => (
          <div key={product.id || index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="h-32 bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-sm text-gray-500">PDF</span>
              </div>
              <p className="text-sm font-medium mb-1 text-gray-500">{product.name}</p>
              <p className="text-xs text-gray-500">Category : {product.category.name}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">{product.rating ? `${product.rating}%` : "No rating"}</p>
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

export default LandingPage;
