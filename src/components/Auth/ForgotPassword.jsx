"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                router.push("/login"); 
            } else {
                setError(data.message); 
            }
        } catch (err) {
            setError("Something went wrong"); 
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <div className="flex justify-center items-center h-screen bg-white">
                <form className="bg-base-100 bg-white p-8 shadow-lg rounded-lg w-96" onSubmit={handleRegister}>
                    <h2 className="text-2xl font-bold mb-4 text-base-content text-black">Forgot Password</h2>
                    {error && <p className="text-error mb-4">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-base-content text-black">Email</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border border-base-300 p-2 rounded bg-white text-black"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-base-content text-black">Old Password</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-base-300 p-2 rounded bg-white text-black"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-base-content text-black">New Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border border-base-300 p-2 rounded bg-white text-black"
                            value={formData.newpassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-primary-content w-full py-2 rounded hover:bg-primary-focus"
                    >
                        Register
                    </button>
                    <p className="mt-4 text-center text-base-content text-gray-500">
                        Already have an account? <a href="/login" className="text-primary text-blue-500">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
