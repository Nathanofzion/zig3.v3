/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'passkey-kit',
    'passkey-factory-sdk',
    'passkey-kit-sdk',
    'sac-sdk',
  ]
};

export default nextConfig;
