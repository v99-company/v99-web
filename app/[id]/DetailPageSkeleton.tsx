import React from "react";

const DetailPageSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6 py-8 px-4 sm:px-8 md:px-24">
      {/* Header Skeleton */}
      <div className="h-72 bg-gray-300 shadow-lg rounded-lg overflow-hidden"></div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16 mt-8 md:mt-16">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          {/* About Us Section */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-300 rounded-md w-48 sm:w-64"></div>
            <div className="h-4 bg-gray-300 rounded-md w-full"></div>
            <div className="h-4 bg-gray-300 rounded-md w-4/5"></div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded-md w-full"></div>
            <div className="h-4 bg-gray-300 rounded-md w-4/5"></div>
          </div>

          {/* Buttons Skeleton */}
          <div className="space-y-2">
            <div className="h-10 bg-gray-300 rounded-md w-1/2"></div>
            <div className="h-10 bg-gray-300 rounded-md w-1/2"></div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-[500px] space-y-6">
          {/* Video Section */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
            <div className="h-32 bg-gray-300 rounded-md"></div>
          </div>

          {/* Map Section */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
            <div className="h-48 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-6 mt-8">
        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
          <div className="flex gap-4 overflow-x-auto">
            <div className="h-20 w-20 bg-gray-300 rounded-md"></div>
            <div className="h-20 w-20 bg-gray-300 rounded-md"></div>
            <div className="h-20 w-20 bg-gray-300 rounded-md"></div>
          </div>
        </div>

        {/* Video Section */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
          <div className="h-32 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailPageSkeleton;
