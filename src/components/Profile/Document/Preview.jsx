"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import HyperFormula from "hyperformula";

const Preview = () => {
  const [data, setData] = useState([]);
  const [colHeaders, setColHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hotTableRef = useRef(null);

  const productId = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/get-excel-data/${productId}`
        );
        let fetchedData = response.data?.data || [];
        const fetchedHeaders = response.data?.headers || [];

        // Pastikan formula menggunakan format koma (`,`) bukan titik koma (`;`)
        fetchedData = fetchedData.map(row =>
          row.map(cell => (typeof cell === "string" ? cell.replace(/;/g, ",") : cell))
        );

        setData(fetchedData);
        setColHeaders(fetchedHeaders);
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
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

  const handleDownloadExcelAsPDF = async () => {
    try {
      const modifiedData = hotTableRef.current.hotInstance.getData();

      const response = await axios.post(
        `http://localhost:8000/api/get/product/${productId}/download-pdf`,
        { data: modifiedData },
        { responseType: "arraybuffer" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `product_${productId}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error downloading and converting Excel to PDF:", error);
      alert("Failed to download and convert Excel to PDF. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  const hyperFormulaInstance = HyperFormula.buildEmpty({
  licenseKey: "internal-use-in-handsontable",
});
  const hotSettings = {
    data: data.length ? data : [["=SUM(A1,B1)"]], // Format koma (`,`)
    colHeaders: colHeaders.length ? colHeaders : [],
    rowHeaders: true,
    contextMenu: true,
    manualRowMove: true,
    manualColumnMove: true,
    colWidths: 100,
    rowHeights: 40,
    licenseKey: "non-commercial-and-evaluation",
    formulas: {
      engine: hyperFormulaInstance,
    },
  };

  return (
    <div className="w-full h-[400px] md:h-[600px] lg:h-[800px] max-w-screen-lg mx-auto overflow-auto">
      <div>
        <HotTable
          ref={hotTableRef}
          settings={hotSettings}
          formulas={true} // Pastikan formulas aktif
        />
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        <div className="text-center">
          <i className="fas fa-download text-gray-500"></i>
          <p
            className="text-xs text-gray-500 cursor-pointer"
            onClick={handleDownloadExcelAsPDF}
          >
            Download Edited Excel as PDF
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
