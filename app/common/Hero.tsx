import type React from "react"
import { motion } from "framer-motion"
import SearchFilters from "./SearchFilters"

interface HeroProps {
  handleFilterChange: (term: string) => void
}

const Hero: React.FC<HeroProps> = ({ handleFilterChange }) => {
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <main className="flex flex-col items-center justify-center">
        <div className=" text-center px-4 ">
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="flex-grow flex flex-col justify-center items-center"
        >
            <motion.h1
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-4xl font-bold mb-6 text-[#e0e1dd]">
                        #1 PLATFORM FOR LISTING LOCAL BUSINESSES
            </motion.h1>
            <SearchFilters onFilterChange={handleFilterChange} />
        </motion.div>
        </div>
    </main>
  )
}

export default Hero

