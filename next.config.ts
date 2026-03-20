import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb",
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "24eot89dvmkbxt6p.public.blob.vercel-storage.com", // O seu hostname específico
                port: "",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "24eot89dvmkbxt6p.public.blob.vercel-storage.com", // O seu hostname específico
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
