"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoriesId = ({ name }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
          const categoryName = product.category?.name || "Uncategorized";
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push(product);
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
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get/categories/${name}`
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [id]);

  if (!products || products.length === 0) {
    return <p className="text-center">No products available</p>;
  }

  if (!categories || categories.length === 0) {
    return <p className="text-center">No categories available</p>;
  }

  return (
    <div className="bg-white px-4 py-8">
      <h2 className="text-xl font-bold mb-4 text-center">Product Categories</h2>
      {Object.keys(sortedProducts).length === 0 ? (
        <p className="text-center text-gray-500">
          No products available for this category.
        </p>
      ) : (
        Object.keys(sortedProducts).map((categoryName) => (
          <div key={categoryName} className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{categoryName}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts[categoryName].map((product) => (
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
                      Category: {product.category?.name || "Uncategorized"}
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
