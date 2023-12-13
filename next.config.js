/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		LANG: process.env.LANG,
		SITE_URL: process.env.SITE_URL
	}
}

module.exports = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'leonardo.osnova.io',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'cdn.discordapp.com',
				pathname: '**'
			}
		]
	}
}
