'use client';
import React, { useState } from 'react';

import { useRouter } from "next/navigation"; 
const Otp = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('OTP Verified');
            router.push('/login');
        }, 2000);
    };

    return (
        <div className="bg-white flex justify-center items-center h-screen w-screen">
            <form className="p-8 shadow-lg rounded-lg w-96" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold mb-4 text-black text-center">Enter OTP</h1>
                <p className="text-gray-500 text-center mb-6">Weve sent a code to your email. Please enter it below.</p>

                <div className="mb-4">
                    <label className="block text-black text-center mb-2">OTP Code</label>
                    <input
                        type="text"
                        name="otp"
                        className="w-full border border-gray-300 p-2 rounded text-center bg-white text-blacktext-xl tracking-widest"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 w-full py-2 rounded hover:bg-blue-600 text-white font-semibold"
                    disabled={loading}
                >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <p className="mt-4 text-center text-gray-500">
                    Didnt receive the code? <a href="#" className="text-blue-500">Resend OTP</a>
                </p>
            </form>
        </div>
    );
};

export default Otp;