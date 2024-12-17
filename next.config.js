module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
    eslint: {
      dirs: ['app'], // Only run ESLint on the 'app' directories during production builds (next build)
    },
  }