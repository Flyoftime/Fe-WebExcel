/* eslint-disable react-hooks/rules-of-hooks */
import React, { use } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Preview from "./Preview";

const ViewDocument = ({ params }) => {
    const id = params.productid;
    const [product, setProduct] = React.useState({});
    const [HTML, setHTML] = React.useState("");

    React.useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/get/product/${id}`);
                    setProduct(response.data.products);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    React.useEffect(() => {
        const fetchExcelUrl = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/get/product/${id}`);
                const workbook = XLSX.read(response.data, { type: 'buffer' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const html = XLSX.utils.sheet_to_html(worksheet);
                setHTML(html);
            } catch (error) {
                console.error(error);
            }
        };
        fetchExcelUrl();
    }, []);

    return (
        <div>
            <h3 className="">Excel Data for Product: {product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <p>
                Excel File:{" "}
                <a
                    href={product.excel_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Download Excel
                </a>
            </p>
            <div dangerouslySetInnerHTML={{ __html: HTML }} />
            <Preview/>
        </div>
    );
};

export default ViewDocument;