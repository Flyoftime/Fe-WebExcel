"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";

const Preview = () => {
  const [data, setData] = useState([]);
  const [colHeaders, setColHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthorized, setAuthorized] = useState(false);

  const productId = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:8000/api/get-excel-data/${productId}`
        );
        const fetchedData = response.data?.data || [];
        const fetchedHeaders = response.data?.headers || [];

        setData(fetchedData);
        setColHeaders(fetchedHeaders);
        setAuthorized(response.data.isAuthorized || false);
      } catch (error) {
        setAuthorized(false);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchData();
    } else {
      setError("Product ID not found");
    }
  }, [productId]);

  const handlePurchase = async () => {
    const token = localStorage.getItem("token");
    try {
      const productResponse = await axios.get(
        `http://localhost:8000/api/get/product/${productId}`
      );

      console.log("Product Response:", productResponse.data.products);
      const grossAmount = productResponse.data.products.price;

      const orderResponse = await axios.post(
        "http://localhost:8000/api/set/orders",
        {
          product_id: productId,
          gross_amount: grossAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order created:", orderResponse.data);
      const { payment_url, order } = orderResponse.data;

      window.location.href = payment_url;
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }

    setAuthorized(true);
  };

  console.log("Data:", data);

  if (loading) {
    return <div className="text-center text-xl">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center text-black text-xl">{error}</div>;
  }

  const hotSettings = {
    data: data.length ? data : [],
    colHeaders: colHeaders.length ? colHeaders : [],
    rowHeaders: true,
    contextMenu: true,
    manualRowMove: true,
    manualColumnMove: true,
    allowInsertRow: false,
    allowInsertColumn: false,
    allowRemoveRow: false,
    allowRemoveColumn: false,
    licenseKey: "non-commercial-and-evaluation",
    colWidths: 100,
    rowHeights: 40,
    formulas: true,
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto overflow-auto relative">
      {!isAuthorized && (
        <div className="absolute inset-0 flex justify-center items-center z-10 bg-opacity-50">
          <div className="text-center text-black text-xl">
            You are not authorized to view this document
            <button
              onClick={handlePurchase}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Purchase
            </button>
          </div>
        </div>
      )}
      <div
        className={`w-full h-[400px] md:h-[600px] lg:h-[800px] max-w-screen-lg mx-auto overflow-auto ${
          !isAuthorized ? "blur-sm" : ""
        }`}
      >
        <HotTable settings={hotSettings} />
      </div>
    </div>
  );
};

export default Preview;
