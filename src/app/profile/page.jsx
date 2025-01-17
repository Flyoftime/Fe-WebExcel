import Navbar from '@/components/User/Navbar';
import Profile from '@/components/Profile/Profile';
import CardAccount from '@/components/Profile/CardAccount';
import React from 'react';
import Footer from '@/components/User/Footer';

const page = () => {
    return (
        <div className="bg-backgroundLight dark:bg-backgroundDark text-textDark dark:text-textLight">
            <Navbar />
            <CardAccount />
            <Footer />
        </div>
    );
};

export default page;
