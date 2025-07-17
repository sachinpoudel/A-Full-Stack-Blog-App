import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Hero = () => {
  const { user } = useAuth();

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-800 py-20 md:py-28 h-[90%]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute left-0 top-0 w-40 h-40 md:w-56 md:h-56 rounded-full bg-white opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute right-0 bottom-0 w-40 h-40 md:w-56 md:h-56 rounded-full bg-white opacity-20 translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Share Your <span className="text-yellow-300">Story</span> With The
            World
          </h1>

          <p className="text-xl md:text-2xl text-indigo-100 mb-10 leading-relaxed">
            Welcome to the blog app here you create blog and see blogs of other
            users.
          </p>

        
        </div>

       
      </div>
    </div>
  );
};

export default Hero;
