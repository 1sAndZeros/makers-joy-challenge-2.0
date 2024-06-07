/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.deloittedigital.com",
        port: "",
        // pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
