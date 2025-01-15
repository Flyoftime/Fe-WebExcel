"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; 

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState(null);;
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`http://localhost:8000/api/login`, formData);
            const userData = response.data;
            setUserData(userData);  
            localStorage.setItem('token', userData.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    useEffect(() => {
        if (userData) {
            if (userData.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        }
    }, [userData, router]);

   
    const handleGoogleLogin = async () => {
        const result = await signIn('google', { redirect: false });
        if (result?.error) {
            setError(result.error || 'Google login failed');
        } else {
            console.log('Google login successful', result);
            const userData = result.user;
            localStorage.setItem('token', userData.token);

            if (userData.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        }
    };

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (
        <div className="bg-white flex justify-center items-center h-screen w-screen">
            <form className="p-8 shadow-lg rounded-lg w-96" onSubmit={handleSubmit}>
                <h1 className="text-5xl font-bold mb-4 text-black">Login</h1>
                <p className="font-medium text-lg text-gray-500 mt-4">Welcome Back! Please enter your details.</p>
                {error && <p className="text-red-500">{error}</p>}

                <div className="mb-4">
                    <label className="block text-black">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full border border-base-300 p-2 rounded bg-white text-black"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-black">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full border border-base-300 p-2 rounded bg-white text-black"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="flex items-center justify-between mb-4">
                    <a href="/forgot-password" className="text-sm hover:underline text-blue-500">
                        Forgot Password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 w-full py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <div className="my-4 flex items-center">
                    <hr className="flex-grow border-base-300" />
                    <span className="mx-2 text-sm text-gray-500">OR</span>
                    <hr className="flex-grow border-base-300" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 flex items-center justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22.68 12.07c0-.56-.05-1.1-.12-1.63H12v3.1h6.02c-.26 1.38-1.03 2.55-2.2 3.32v2.75h3.56c2.08-1.92 3.3-4.75 3.3-8.54z"></path>
                        <path d="M12 22c2.43 0 4.48-.8 5.97-2.15l-3.56-2.75c-.83.56-1.88.89-3.02.89-2.33 0-4.31-1.57-5.02-3.68H2.29v2.31A9.98 9.98 0 0012 22z"></path>
                        <path d="M6.98 12c0-.63.1-1.24.27-1.82V7.87H2.29A10 10 0 0012 2c1.36 0 2.64.26 3.82.73L12 6.36c-.94-.6-2.11-.95-3.32-.95C6.92 5.41 5 8.02 5 11.02c0 .98.24 1.89.65 2.7z"></path>
                    </svg>
                    Continue with Google
                </button>

                <p className="mt-4 text-center text-gray-500">
                    Dont have an account? <a href="/register" className="text-blue-500">Register</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
