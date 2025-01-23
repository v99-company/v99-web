import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'backend.v99.in', // backend.mortuarybox.com files url
      'images.unsplash.com', 'plus.unsplash.com', 's3-sg-apps-temp.s3-ap-southeast-1.amazonaws.com', 'cdn.myshopmatic.com', 'via.placeholder.com'],  // Allow these domains for external images
  },
};

export default nextConfig;
