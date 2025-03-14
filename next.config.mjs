/** @type {import('next').NextConfig} */
const nextConfig = {
   
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      },
      images: {
        domains: ['utfs.io','img.clerk.com'],
      },
      "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true, // Allow default imports from CommonJS modules
        "allowSyntheticDefaultImports": true
      }
};

export default nextConfig;
