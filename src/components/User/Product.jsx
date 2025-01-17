import apiClient from '@/app/utils/apiCLient'
import React from 'react'

const Product = ({product}) => {
    // const fetch = async () => {
    //     const res = await apiClient.get(`/get/product`)
    //     const product = await res.data.products
    //     console.log(product)
    // }

    // fetch()

    console.log(product)
    return (
        <div>{product}</div>
    )
}

export default Product

export async function getServerSideProps() {
    const res = await apiClient.get(`/get/product`)
    const product = await res.data.products

    return {
        props: {
            product: product
        }
    }
}