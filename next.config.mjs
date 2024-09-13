/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { dev }) {
      if (dev) {
        config.devtool = 'source-map';
      }
      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'static.tildacdn.com',
          pathname: '/**', // yeh pattern allow karega static.tildacdn.com se saari images ko
        },
      ],
    },
  };
  
  export default nextConfig;