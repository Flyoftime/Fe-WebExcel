import SettingsFile from '@/components/Admin/SettingsFile'
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
        <div className='flex'>
            <Sidebar />
            <main>
                <SettingsFile />
            </main>
        </div>
    )
}

export default page