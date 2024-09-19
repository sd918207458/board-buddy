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
    domains: ['i.postimg.cc'], // 添加你圖片來源的域名
  },
};

export default nextConfig;
