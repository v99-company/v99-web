import type React from "react"
import { motion } from "framer-motion"
import SearchFilters from "./SearchFilters"
import { HERO_SECTION_HEADING } from "../utils/strings"

interface HeroProps {
  handleFilterChange: (term: string) => void
}

const Hero: React.FC<HeroProps> = ({ handleFilterChange }) => {
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

  return (
    <main className="flex flex-col items-center justify-center text-center px-4 pb-16">
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
          Connect, List & Discover Businesses & Experts Near You
        </motion.p>

        {/* Search Bar */}
        <SearchFilters onFilterChange={handleFilterChange} />
      </motion.div>
    </main>
  );
};

export default Hero;
