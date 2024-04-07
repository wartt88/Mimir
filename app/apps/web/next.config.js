/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  experimental: {
    missingSuspenseWithCSRBailout: false,
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
  eslint: {
    // Avertissement : Cela permet à la construction de production de se terminer avec succès même si
    // votre projet a des erreurs ESLint.
    ignoreDuringBuilds: true,
  },

  webpack: (config) => {
    config.resolve.fallback = {
      "mongodb-client-encryption": false,
      aws4: false,
    };

    return config;
  },
};
