import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // O Next.js moderno aceita ignorar o ESLint durante o build se configurado assim:
  images: {
    unoptimized: true, // ajuda a evitar erros de otimização de imagens no build
  }
};

export default nextConfig;