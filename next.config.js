// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//         appDir: true,
//     },
//     images: {
//         domains: [
//             "avatars.githubusercontent.com",
//         "lh3.googleusercontent.com",
//         "res.cloudinary.com"
//         ]
//     }
// }

// module.exports = nextConfig




/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google avatars
        port: '',
        pathname: '/**', // allow all paths
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // if you use Cloudinary
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
