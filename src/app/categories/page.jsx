import Categories from '@/components/User/Categories/Categories'
import Footer from '@/components/User/Footer'
import Navbar from '@/components/User/Navbar'
import React from 'react'

const page = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Categories />
            </main>
            <Footer />
        </div>
    )
}

export default page;
