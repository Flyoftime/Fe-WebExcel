import Products from '@/components/Admin/Products'
import Sidebar from '@/components/Admin/SideBarAdmin'
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
const page = async () => {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        redirect('/login');
    }
    return (
        <div className='flex bg-white'>
            <Sidebar />
            <main className='flex-grow'>
                <Products />
            </main>
        </div>
    )
}

export default page