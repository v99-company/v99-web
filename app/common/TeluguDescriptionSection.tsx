"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const TeluguDescriptionSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative w-full h-auto bg-gray-100 py-8">
    {/* Heading */}
    <div className="w-full text-center py-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 ml-16">Telugu Description</h2>
    </div>
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-lg">
          {/* Section that expands or collapses */}
          <div
            className={`relative transition-all duration-500 ease-in-out ${
              isExpanded ? 'h-auto' : 'h-72'
            }`}
          >
            <Image
              src="/telugu_des.jpeg"
              alt="Telugu Description"
              layout="responsive"
              width={800}
              height={400}
              objectFit="cover"
              className="transition-all duration-500 ease-in-out"
            />
          </div>
          {/* Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isExpanded ? 'తెలుగును కుదించు | Collapse' : 'తెలుగు విస్తరించండి | Expand in Telugu'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeluguDescriptionSection;
