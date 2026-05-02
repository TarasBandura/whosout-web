import path from 'path';
import { fileURLToPath } from 'url';

import type { NextConfig } from 'next';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Avoid resolving file tracing against the Expo app repo root when a parent lockfile exists. */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
