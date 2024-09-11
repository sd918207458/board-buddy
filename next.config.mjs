/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {//測試中
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.daisyui.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;
