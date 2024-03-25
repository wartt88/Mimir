/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  experimental: {
    serverActions: true,
    esmExternals:'loose',
    serverComponentsExternalPackages: ['mongoose'],
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },
//   webpack: (config) => {
//     config.resolve.fallback = {
//       // "kerberos": false,
//       // "aws4": false,
//       // "child_process":false,
//       // "fs/promises":false,
//       // "net":false,
//       // "tls":false,
//       // "fs":false,
//       // "dns":false,
//     };
//     return config;
//  }

};
