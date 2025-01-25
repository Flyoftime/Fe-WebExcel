
import SubcategoriesId from '@/components/User/Categories/SubCategories';
import Footer from '@/components/User/Footer';
import Navbar from '@/components/User/Navbar';
import React from 'react'


const page = async (params) => {
    const {subcategory} = params;

    return (
        <div className="bg-white">
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <SubcategoriesId name={subcategory}/>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default page