import CategoriesId from '@/components/User/Categories/CategoriesId';
import Footer from '@/components/User/Footer';
import Navbar from '@/components/User/Navbar';
import React from 'react'


const page = async (params) => {
    const { categoriesId } = params
    return (
        <div className="bg-white">
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <CategoriesId name={categoriesId} />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default page