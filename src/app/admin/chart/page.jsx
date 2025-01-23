import Chart from '@/components/Admin/Chart'
import ChartAktif from '@/components/Admin/ChartAktif'
import ChartEarnings from '@/components/Admin/ChartEarnings'
import Sidebar from '@/components/Admin/SideBarAdmin'
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const page = async() => {
      const session = await getServerSession(authOptions);
      if (!session || session.user.role !== 'admin') {
          redirect('/login');
      }
  return (
    <div className='flex bg-white'>
      <Sidebar />
      <main className='flex-col p-5' >
        <Chart/>
        <ChartEarnings/>
        <ChartAktif/>
      </main>
      
    </div>
  )
}

export default page