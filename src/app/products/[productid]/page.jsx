"use client";

import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
    const [id, setId] = useState();

    useEffect(() => {
        if (params?.productid) {
            setId(params.productid);
        }
    }, [params]);

    return (
        <div>{id ? `Product ID: ${id}` : 'Loading...'}</div>
    );
};

export default Page;
