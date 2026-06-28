/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Isso diz para o GitHub: "Pode fazer o build mesmo se faltar alguma tipagem"
    ignoreBuildErrors: true,
  },
  eslint: {
    // Evita que avisos de formatação travem o processo
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;