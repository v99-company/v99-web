"use client"
import type React from "react"
import { motion } from "framer-motion"
import SearchFilters from "./SearchFilters"
import { useEffect, useState } from "react"
import { Grid, MapPin, Users } from "lucide-react"

interface HeroProps {
  handleFilterChange: (term: string) => void
}


const Hero: React.FC<HeroProps> = ({ handleFilterChange }) => {
  const stats = {
    totalProviders: 120,
    areasCovered: 30,
    categories: 20
  };

  const [count, setCount] = useState({
    totalProviders: 0,
    areasCovered: 0,
    categories: 0
  });

  const statsConfig = [
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      label: "Businesses",
      value: count.totalProviders,
      delay: 1.5
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-500" />,
      label: "Areas Covered",
      value: count.areasCovered,
      delay: 1.7
    },
    {
      icon: <Grid className="w-6 h-6 text-purple-500" />,
      label: "Categories",
      value: count.categories,
      delay: 1.9
    }
  ];


  const headingVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Animate the counting effect
// For an even smoother animation
useEffect(() => {
  const interval = setInterval(() => {
    setCount((prev) => ({
      totalProviders: Math.min(prev.totalProviders + 10, stats.totalProviders), // Even smaller increment
      areasCovered: Math.min(prev.areasCovered + 2, stats.areasCovered),    // Half-step increment
      categories: Math.min(prev.categories + 3, stats.categories)            // Half-step increment
    }));
  }, 300); // Faster interval
  
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative w-full flex items-center justify-center text-center px-4 pb-24">
  
      {/* Center Content */}
      <div className="flex flex-col items-center justify-center text-center px-4 pb-16 flex-1">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex flex-col justify-center items-center space-y-4"
        >
          {/* Main Heading */}
          <motion.h1
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
          >
            No.1 Local Business Directory  
          </motion.h1>
  
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-2xl text-white font-semibold"
          >
            Connect, List & Discover Businesses & Service Providers Near You
          </motion.p>
  
          {/* Search Bar */}
          <SearchFilters onFilterChange={handleFilterChange} />
        </motion.div>
      </div>

      {/* Stats Section (Bottom Right) */}
      <div className="absolute right-8 bottom-0 lg:bottom-4 mb-4">
      <div>
          <div className="flex items-end justify-between space-y-4 gap-x-4">
            {statsConfig.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: stat.delay }}
                className="flex flex-col items-center gap-2 text-white bg-gray-500/50 p-4 rounded-xl"
              >
                <div>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    {stat.value.toLocaleString()}+
                  </p>
                  <p className="text-sm text-gray-300">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
      </div>
    </div>
      
    </main>
  );
};

export default Hero;