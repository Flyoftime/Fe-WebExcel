import Navbar from '@/components/User/Navbar';
import CardAccount from '@/components/Profile/CardAccount';
import React from 'react';
import Footer from '@/components/User/Footer';

const page = () => {
    return (
        <div className="bg-white">
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <CardAccount />
                </main>
                <Footer />
            </div>
        </div>
    )
};

export default page;
