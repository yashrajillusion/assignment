const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
