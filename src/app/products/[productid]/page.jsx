"use client";

import Sidebar from '@/components/Profile/Document/Sidebar';
import ViewDocument from '@/components/Profile/Document/ViewDocument';
import Navbar from '@/components/User/Navbar';
import React from 'react';

const Page = ({ params }) => {
    

    return (
        <div className='max-w-screen w-full min-h-screen px-64 py-[68px]'>
            <Sidebar/>{/* bisi mau edit yang ini ada di folder profile document bagian side bar nanti kalau mau bikin preview di viewDOcument */}
            <Navbar/>
            <ViewDocument params={params} />
            </div>
    );
};

export default Page;
