/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // This allows all external HTTPS images
            },
        ],
        unoptimized: true, // Allows using external images without optimization
    },
};

export default nextConfig;
