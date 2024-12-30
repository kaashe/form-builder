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
        <div className="relative min-h-screen bg-gradient-to-r from-blue-500 to-indigo-400 flex flex-col justify-center items-center text-white text-center px-4 sm:px-6 lg:px-8">
            {isVisible ? (
                <div className="fade-in space-y-4">
                    {/* Icon size adjusts based on screen size */}
                    <FcMindMap className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl animate-pulse mx-auto" />
                    <p className="text-base sm:text-lg font-semibold">Loading...</p>
                </div>
            ) : (
                <div className="fade-in space-y-6 w-full max-w-md">
                    <h1 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                        <span>Forms That Speak for You</span>
                        <FaWpforms className="text-[#7FFFD4] text-2xl sm:text-3xl md:text-4xl" />
                    </h1>

                    <button
                        onClick={handleClick}
                        className="w-full sm:w-auto bg-white text-blue-500 px-6 sm:px-8 py-3 rounded-lg shadow-lg 
                       hover:bg-blue-100 hover:scale-105 transform transition-all duration-300 
                       flex items-center justify-center gap-2 sm:gap-3 mx-auto"
                        aria-label="Navigate to form creation"
                    >
                        <span className="text-base sm:text-lg">Let's Go</span>
                        <FcNext className="text-2xl sm:text-3xl" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SplashScreen;
