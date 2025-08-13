'use client';
import React from "react";
import {Button} from "@/components/ui/button";
const HeroSection = () => {
  return (

<section className="relative w-full h-[90vh] flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 animate-fadeIn">
        <h1 className="text-white font-bold text-4xl md:text-6xl font-['Montserrat'] mb-4 drop-shadow-lg">
          Welcome to <span className="text-blue-400">MapSarthi</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-2xl max-w-2xl mx-auto mb-8 drop-shadow-md">
          Explore the world with intuitive mapping, local insights, and immersive travel experiences.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-blue-500 hover:bg-blue-600 transition-transform hover:scale-105">
            Get Started
          </Button>
          <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 transition-transform hover:scale-105">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
