"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';

const Preview = () => {
    const [data, setData] = useState([]);
    const [colHeaders, setColHeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const productId = window.location.pathname.split('/').pop();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await axios.get(`http://localhost:8000/api/get-excel-data/${productId}`);
                const fetchedData = response.data?.data || [];
                const fetchedHeaders = response.data?.headers || [];

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
            setError('Product ID not found');
        }
    }, [productId]);

    console.log('Data:', data);

    if (loading) {
        return <div className="text-center text-xl">Loading data...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 text-xl">{error}</div>;
    }

    const hotSettings = {
        data: data.length ? data : [['=SUM(A1:A2)']],
        colHeaders: colHeaders.length ? colHeaders : [],
        rowHeaders: true,
        contextMenu: true,
        manualRowMove: true,
        manualColumnMove: true,
        allowInsertRow: false,
        allowInsertColumn: false,
        allowRemoveRow: false,
        allowRemoveColumn: false,
        licenseKey: 'non-commercial-and-evaluation',
        colWidths: 100,
        rowHeights: 40,
        formulas: true,
    };

    return (
        <div className="w-full h-[400px] md:h-[600px] lg:h-[800px] max-w-screen-lg mx-auto overflow-auto">
            <HotTable settings={hotSettings} />
        </div>
    );
};

export default Preview;
