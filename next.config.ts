import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // Allow access from local network IPs during development
  ...(process.env.NODE_ENV === "development" && {
    experimental: {
      allowedDevOrigins: ["192.168.0.20:3000"],
    },
  }),
};

export default nextConfig;
