/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig
module.exports = {
    output: 'export',
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.ibb.co',
          port: '',
          pathname: '/BTZDb4q/bntex.png',
        },
        // {
        //   protocol: 'https',
        //   hostname: 'i.ibb.co',
        //   port: '',
        //   pathname: '/X7QwZ6Y/Tonmoy-Talukder.jpg',
        // },
      ],
    },
  }