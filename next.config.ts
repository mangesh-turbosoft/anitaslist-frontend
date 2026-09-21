import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Next 16 requires an explicit allowlist; default is [75], which looked soft on photography.
    qualities: [75, 90],
  },
};

export default nextConfig;
