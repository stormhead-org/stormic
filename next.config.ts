import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000'
				// pathname: '/account123/**',
				// search: '',
			}
		]
	},
	experimental: {
		reactCompiler: false
	},
	reactStrictMode: true
}

export default withPayload(nextConfig)
