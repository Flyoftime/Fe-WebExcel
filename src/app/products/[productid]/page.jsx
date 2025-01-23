import Preview from '@/components/Profile/Document/Preview';
import Sidebar from '@/components/Profile/Document/Sidebar';
import Navbar from '@/components/User/Navbar';
import React from 'react';


const Page = async ({ params }) => {
    const { productid } = params;

    let documentData = null;

    try {
        const response = await fetch(`http://localhost:8000/api/get-excel-data/${productid}`, { cache: 'no-store' });
        documentData = await response.json();
    } catch (error) {
        console.error("Error fetching document data:", error);
    }

    if (!documentData) {
        return <div className="text-center mt-20 text-red-500">Error loading document data.</div>;
    }

    return (
        <div className="max-w-screen w-full min-h-screen px-64 py-[68px]">
            <Sidebar />
            <Navbar />
            <Preview document={documentData} />
        </div>
    );
};

export default Page;
