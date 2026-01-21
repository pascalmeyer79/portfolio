/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [100, 75],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'pascalmey.com',
          },
        ],
        destination: 'https://www.pascalmey.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
