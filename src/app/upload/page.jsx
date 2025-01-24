import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Footer from '@/components/User/Footer'
import Navbar from '@/components/User/Navbar'
import Upload from '@/components/User/Upload'
import React from 'react'

const Uploadpage = async () => {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session || session.user.role !== 'seller') {
        redirect('/');
    }
    return (
        <div className="bg-white">
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Upload id={session.user.id}/>
                </main>
                <Footer />

            </div>
        </div>
            )
}

export default Uploadpage;