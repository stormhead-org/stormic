/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: config => {
		config.externals.push({
			'utf-8-validate': 'commonjs utf-8-validate',
			bufferutil: 'commonjs bufferutil',
		})

		return config
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.discordapp.com',
				pathname: '**',
			},
		],
	},
	output: 'standalone',
}

export default nextConfig
