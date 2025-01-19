import Navbar from '@/components/User/Navbar';
import CardAccount from '@/components/Profile/CardAccount';
import React from 'react';
import Footer from '@/components/User/Footer';

const page = () => {
    return (
        <div className="bg-white">
            <Navbar />
            <CardAccount />
            <Footer />
        </div>
    );
};

export default page;
