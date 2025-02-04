import Otp from '@/components/Auth/Otp';
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
const otpPage = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect('/');
    }
    return (
        <div>
            <Otp />
        </div>
    )
}

export default otpPage