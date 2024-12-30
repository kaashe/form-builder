// SplashScreen.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcMindMap, FcComboChart, FcNext } from "react-icons/fc";
import { FaWpforms } from "react-icons/fa";

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, []);

    const handleClick = () => {
        navigate("/create-form");
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-blue-500 to-indigo-400 flex flex-col justify-center items-center text-white text-center">
            {isVisible ? (
                <div className="fade-in">
                    <FcMindMap className="text-9xl animate-pulse" />
                    <p className="mt-4 text-lg font-semibold">Loading...</p>
                </div>
            ) : (
                <div className="fade-in">
                    <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
                        Forms That Speak for You <FaWpforms className="text-[#7FFFD4] text-4xl" />
                    </h1>
                    <button
                        onClick={handleClick}
                        className="bg-white text-blue-500 px-8 py-3 rounded-lg shadow-lg hover:bg-blue-100 hover:scale-105 transform transition-all duration-300 flex items-center gap-3"
                        aria-label="Navigate to form creation"
                    >
                        Let's Go <FcNext className="text-3xl" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SplashScreen;
