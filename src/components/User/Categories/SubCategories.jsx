"use client";

import React, { use, useEffect, useState } from "react";
import axios from "axios";

const SubcategoriesId = ({ name }) => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [sortedProducts, setSortedProducts] = useState({});
  const id = name;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get/product/`
        );
        setProducts(response.data.products);
        const grouped = response.data.products.reduce((acc, product) => {
          const subcategoryName = product.subcategory?.name || "Uncategorized";
          if (!acc[subcategoryName]) {
            acc[subcategoryName] = [];
          }
          acc[subcategoryName].push(product);
          return acc;
        }, {});
        setSortedProducts(grouped);
      } catch (error) {
        console.error("Error fetching products:", error);
      } 
    };
    fetchProducts();  
  }, [id]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get/subcategories/${name}`
        );  
        setSubcategories(response.data.subcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubcategories();
  }, [name]);

  const handleProductSelect = (productId) => {
    console.log("Selected Product ID:", productId);
    window.location = `/products/${productId}`;
  };

  return (
    <div className="bg-white px-4 py-8">
  <h2 className="text-xl font-bold mb-4 text-center">Product Subcategories</h2>
  {Object.keys(sortedProducts).length === 0 ? (
    <p className="text-center text-gray-500">
      No products available for this subcategory.
    </p>
  ) : (
    Object.keys(sortedProducts).map((subcategoryName) => (
      <div key={subcategoryName} className="mb-8">
        <h3 className="text-lg font-semibold mb-4">{subcategoryName}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts[subcategoryName].map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
              onClick={() => (window.location = `/products/${product.id}`)}
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
                  Subcategory: {product.subcategory?.name || "Uncategorized"}
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

export default SubcategoriesId;
