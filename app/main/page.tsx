"use client";
import { useEffect, useRef, useState } from "react";
import { HERO_SECTION_VIDEO } from "../utils/strings";
import Navbar from "../common/Navbar";
import SearchFilters from "../common/SearchFilters";
import ClientList from "../common/ClientsList";
import Hero from "../common/Hero";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import WhatWeAre from "../common/WhatWeAre";



export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientsCount, setClientsCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Debounced search filter handling
  const handleFilterChange = (term: string) => {
    console.log("Search term:", term);
    setSearchTerm(term || '');
  };

  // const searchParams = useSearchParams();

  // // Effect to read search parameter and set search term
  // useEffect(() => {
  //   const search = searchParams.get('search'); // Get 'search' parameter from URL
  //   if (search) {
  //     setSearchTerm(search);
  //   }
  // }, [searchParams]);

  useEffect(() => {
    // Fetch total clients count when the component mounts
    async function fetchClientsCount() {
      try {
        const result = await fetch('/api/counts/', {
          method: 'GET',
        });
        if (!result.ok) {
          console.log('Error fetching counts');
          return;
        }
        const data = await result.json();
        setClientsCount(data.data.count);
      } catch (error) {
        console.log('Error fetching counts:', error);
      }
    }
    fetchClientsCount();

    // Adjust video playback speed
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <main className="bg-slate-200">
      <div className="relative text-white flex-col items-center justify-center">
        {/* Video Background */}
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
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 flex items-center justify-between flex-col min-h-96 w-full ">
          {/* Navbar */}
          <div className="w-full bg-white/10"> 
          <Navbar />
          </div>

          {/* Hero Content */}
          <Hero handleFilterChange={handleFilterChange} />         

            
          <div></div> {/* Important */}
        </div>
      </div>

      {/* What we are section */}
      <WhatWeAre />

      {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 flex flex-wrap gap-4 justify-center w-full max-w-6xl mx-auto py-4 px-2 text-red-850"
        >
          {[
            {
              title: "Happy Customers",
              count: 1000,
              icon: "😊",
            },
            {
              title: "Verified Businesses",
              count: 500,
              icon: "🏢",
            },
            {
              title: "Areas Covered",
              count: 20,
              icon: "🌍",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 * index, duration: 0.5 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} // Smoother and larger scale on hover
              className="flex flex-col items-center bg-white py-2 px-4 rounded-lg shadow-md backdrop-blur-sm cursor-pointer w-[120px] sm:w-[160px] md:w-[200px]"
            >
              <motion.span
                className="text-2xl sm:text-3xl mb-2"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 2, delay: 1 + 0.2 * index, ease: "easeInOut" }}
              >
                {item.icon}
              </motion.span>
              <motion.h2
                className="text-lg sm:text-xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 + 0.2 * index }}
              >
                {item.count}+
              </motion.h2>
              <p className="text-center text-xs sm:text-sm">{item.title}</p>
            </motion.div>
          ))}
        </motion.div> */}


      {/* List Section */}
      <ClientList searchTerm={searchTerm} />
    </main>
  );
}