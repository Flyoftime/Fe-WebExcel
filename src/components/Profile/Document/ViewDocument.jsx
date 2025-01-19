"use client";
import React, { useEffect, useState } from 'react';
const ViewDocument = ({params }) => {
    const [id, setId] = useState();

    useEffect(() => {
        if (params?.productid) {
            setId(params.productid);
        }
    }, [params]);
    return (
        <div>{id ? `Product ${id}` : 'Loading...'}</div>
    )
}

export default ViewDocument