import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	// reactStrictMode: false,
	images: {
		formats: ["image/webp", "image/avif"],
		qualities: [75, 85, 90],
		deviceSizes: [640, 768, 1024, 1280, 1536],
		imageSizes: [16, 32, 48, 64, 96, 128],
	},
}

export default nextConfig
