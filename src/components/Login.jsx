import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (credentials.username === "doctor" && credentials.password === "doctor") {
            localStorage?.setItem('authentic', 'yes')
            navigate("/doctor");
        } else {
            alert("Invalid credentials!");
        }
    };

    return (
        <div className="min-h-screen p-4 bg-gradient-to-r from-blue-500 to-indigo-500">
            <form onSubmit={handleLogin} className="max-w-md mx-auto text-white flex flex-col gap-3">
                <h2 className="text-xl font-bold mb-4 text-center">Doctor Login</h2>
                <div>
                    <label className="block">Username</label>
                    <input
                        type="text"
                        className="border rounded w-full p-2"
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block">Password</label>
                    <input
                        type="password"
                        className="border rounded w-full p-2"
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </div>
                <button type="submit"   className="bg-slate-300 text-blue-600 px-6 py-2 rounded-lg mt-3  w-full">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
