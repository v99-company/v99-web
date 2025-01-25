import React from 'react';
import { motion } from 'framer-motion';

const WhatWeAre = () => {
  return (
    <section>
      {/* Heading */}
      <div className="w-full text-center py-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 ml-16">What We Are</h2>
      </div>

      {/* Scrolling Slogans Section */}
      <div className="w-full relative overflow-hidden bg-gradient-to-r from-blue-300 via-lime-300 to-orange-300">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ 
            repeat: Infinity, 
            duration: 20, 
            ease: 'linear',
            repeatType: "loop"
          }}
          className="flex whitespace-nowrap py-2"
        >
          {/* First set of content */}
          <div className="flex">
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Affordable Presence, Unstoppable Growth.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Your Business, Online in Seconds—For Less Than a Cup of Tea!</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Empower Your Business, Elevate Your Reach.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">From Local to Global, With Just 5 Digits.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Promote your business with V99 for just 1 rupee a day.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Unlock Opportunities, Unlock Potential.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Affordable Visibility, Unlimited Possibilities.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Simple, Affordable, Effective.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Your Business Deserves to Shine.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Making Digital Presence Accessible to All.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Connect, Grow, Thrive—All for Just 1 Rupee a Day.</span>
          </div>
          {/* Duplicate content to ensure smooth infinite scroll */}
          <div className="flex">
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Affordable Presence, Unstoppable Growth.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Your Business, Online in Seconds—For Less Than a Cup of Tea!</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Empower Your Business, Elevate Your Reach.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">From Local to Global, With Just 5 Digits.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Promote your business with V99 for just 1 rupee a day.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Unlock Opportunities, Unlock Potential.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Affordable Visibility, Unlimited Possibilities.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Simple, Affordable, Effective.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Your Business Deserves to Shine.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Making Digital Presence Accessible to All.</span>
            <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Connect, Grow, Thrive—All for Just 1 Rupee a Day.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeAre;