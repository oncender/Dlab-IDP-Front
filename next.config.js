/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
    reactStrictMode: false, //true
    sassOptions : {
        includePaths: [path.join(__dirname,'styles')]
    },
    async rewrites() {
        // if (process.env.NODE_ENV !== 'production') {
            return [
                {
                    destination: process.env.DESTINATION,
                    source: process.env.SOURCE,
                },
            ]
        // }
    },
    typescript: {
        ignoreBuildErrors: true,
    }
}

// module.exports = nextConfig
