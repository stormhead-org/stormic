const SITE_URL =
	process.env.NEXT_PUBLIC_SERVER_URL

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: SITE_URL,
	generateRobotsTxt: true,
	exclude: ['/posts-sitemap.xml', '/*', '/p/*'],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				disallow: '/admin/*',
			},
		],
		additionalSitemaps: [`${SITE_URL}/posts-sitemap.xml`],
	},
}