"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Hero = ({ handleOrderPopup }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/get/product");
                const data = await response.json();
                if (data && data.products) {
                    setProducts(data.products);
                    setSelectedProduct(data.products[0]); // Set the first product as default
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const bgImage = {
        backgroundImage: `url(/public/assets/books/blue-pattern.png)`, // Change this to a valid URL or import
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
    };

    if (!selectedProduct) return null; // Return null while waiting for the products to load

    return (
        <div
            className="min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200"
            style={bgImage}
        >
            <div className="container pb-8 sm:pb-0">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    {/* Text content section */}
                    <div
                        data-aos-once="true"
                        className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1"
                    >
                        <h1
                            data-aos="zoom-out"
                            data-aos-duration="500"
                            data-aos-once="true"
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                        >
                            {selectedProduct.title}
                            <p className="bg-clip-text text-transparent bg-gradient-to-b from-primary text-right text-sm to-secondary">
                                by {selectedProduct.author || "Anonymous"}
                            </p>
                        </h1>
                        <p
                            data-aos="slide-up"
                            data-aos-duration="500"
                            data-aos-delay="100"
                            className="text-sm"
                        >
                            {selectedProduct.description}
                        </p>
                        <div>
                            <button
                                onClick={handleOrderPopup}
                                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                            >
                                Order Now
                            </button>
                        </div>
                    </div>
                    {/* Image section */}
                    <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2">
                        <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
                            <Image
                                data-aos="zoom-in"
                                data-aos-once="true"
                                src={selectedProduct.image_url}
                                alt={selectedProduct.title}
                                width={450}
                                height={450}
                                className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto"
                            />
                        </div>
                        <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute -bottom-[40px] lg:-right-1 bg-white rounded-full">
                            {products.map((product) => (
                                <div key={product.id} className="max-w-[100px] h-[100px]">
                                    <Image
                                        data-aos="zoom-in"
                                        data-aos-once="true"
                                        src={product.image_url}
                                        onClick={() => {
                                            setSelectedProduct(product);
                                        }}
                                        alt={product.title}
                                        width={100}
                                        height={100}
                                        className="object-contain inline-block hover:scale-110 duration-200 cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
