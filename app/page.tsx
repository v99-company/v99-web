"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./common/Navbar";
import Hero from "./common/Hero";
import WhatWeAre from "./common/WhatWeAre";
import ClientList from "./common/ClientsList";
import { HERO_SECTION_VIDEO } from "./utils/strings";

const MainView: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  // Function to handle search and navigate to Search Page
  const handleSearchStart = (term: string): void => {
    router.push(`/search?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <div className="relative text-white">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
          >
            <source src={HERO_SECTION_VIDEO} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-between min-h-96 w-full">
          <Navbar className="w-full bg-transparent" />
          <Hero handleFilterChange={handleSearchStart} />
        </div>
      </div>

      {/* What We Are Section */}
      <WhatWeAre />

      {/* Featured Clients List */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-700">Featured Businesses</h2>
          <ClientList searchTerm="" />
        </div>
      </div>
    </div>
  );
};

export default MainView;
