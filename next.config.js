/** @type {import('next').NextConfig} */
const nextConfig = {

}

module.exports = {
    reactStrictMode: true,
    async rewrites() {
        if (process.env.NODE_ENV !== 'production') {
            return [
                {
                    destination: process.env.DESTINATION,
                    source: process.env.SOURCE,
                },
            ];
        }
    },
}

// module.exports = nextConfig
