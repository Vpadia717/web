import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Disable source maps in production to prevent code exposure */
  productionBrowserSourceMaps: false,

  /* Transpile Three.js ecosystem for proper bundling */
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  /* Security headers for all routes */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
