/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		LANG: process.env.LANG
	}
}

module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['leonardo.osnova.io', 'cdn.discordapp.com']
	}
}
