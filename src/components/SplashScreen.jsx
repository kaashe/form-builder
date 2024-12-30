// SplashScreen.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcMindMap } from "react-icons/fc";
import { FcComboChart } from "react-icons/fc";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserInjured } from "react-icons/fa";
import { FcNext } from "react-icons/fc";

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Hide splash screen after 3 seconds
        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    }, []);

    const handleDoctorClick = () => {
        navigate("/login");
    };

    const handleClick = () => {
        navigate("/create-form");
    };

    console.log(isVisible, 'isVisible');

    return (
        <div className="relative min-h-screen px-2 bg-gradient-to-r from-blue-500 to-indigo-400 flex flex-col justify-center items-center text-white text-center">
    {isVisible ? (
        <FcMindMap className="text-9xl animate-pulse" />
    ) : (
        <>
            {/* Doctor Button Positioned at the Top-Right */}
            {/* <button
                onClick={handleDoctorClick}
                className="absolute top-4 right-4 bg-white text-blue-500 px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
            >
                Doctor? <FaUserDoctor className="text-2xl" />
            </button> */}

            {/* Main Content */}
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
                Design Forms <FcComboChart className="text-white text-5xl" />
            </h1>
            {/* <p className="text-lg mb-6">Helps doctors</p> */}

            <button
                onClick={handleClick}
                className="bg-white text-blue-500 px-6 py-2 rounded-lg mb-3 justify-between flex items-center gap-3"
            >
                Let Go <FcNext className="text-3xl text-blue-500" />
            </button>
        </>
    )}
</div>

    );
};

export default SplashScreen;
