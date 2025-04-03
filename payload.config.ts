import { Media } from '@/modules/collections/Media/index'
import { Users } from '@/modules/collections/Users/index'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { Comments } from './modules/collections/Comments'
import { Communities } from './modules/collections/Communities'
import { CommunityUsersBans } from './modules/collections/CommunityUsersBans'
import { CommunityUsersMutes } from './modules/collections/CommunityUsersMutes'
import { FollowCommunity } from './modules/collections/FollowCommunity'
import { LikePost } from './modules/collections/LikePost'
import { Posts } from './modules/collections/Posts'
import { Roles } from './modules/collections/Roles'
import { SidebarNavigation } from './modules/globals/Navigation'
import { HostSettings } from './modules/globals/Settings'
import { revalidateRedirects } from './shared/hooks/revalidateRedirects'
import { getServerSideURL } from './shared/lib/getURL'
import { HostRoles } from './modules/collections/HostRoles'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname)
		},
		livePreview: {
			breakpoints: [
				{
					label: 'Mobile',
					name: 'mobile',
					width: 375,
					height: 667
				},
				{
					label: 'Tablet',
					name: 'tablet',
					width: 768,
					height: 1024
				},
				{
					label: 'Desktop',
					name: 'desktop',
					width: 1440,
					height: 900
				}
			]
		}
	},
	collections: [
		Users,
		Posts,
		Communities,
		Comments,
		Media,
		Roles,
		HostRoles,
		FollowCommunity,
		CommunityUsersBans,
		CommunityUsersMutes,
		LikePost
	],
	globals: [HostSettings, SidebarNavigation],
	cors: [getServerSideURL()].filter(Boolean),
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts')
	},
	jobs: {
		access: {
			run: ({ req }: { req: PayloadRequest }): boolean => {
				// Allow logged in users to execute this endpoint (default)
				if (req.user) return true

				// If there is no logged in user, then check
				// for the Vercel Cron secret to be present as an
				// Authorization header:
				const authHeader = req.headers.get('authorization')
				return authHeader === `Bearer ${process.env.CRON_SECRET}`
			}
		},
		tasks: []
	},

	i18n: {
		fallbackLanguage: 'en',
		supportedLanguages: { en, ru }
	},

	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || ''
		}
	}),

	email: nodemailerAdapter({
		defaultFromAddress: 'staff@stormhead.org',
		defaultFromName: 'Stormic',
		transportOptions: {
			host: process.env.SMTP_HOST,
			port: 587,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS
			}
		}
	}),

	sharp,
	plugins: [
		s3Storage({
			collections: {
				media: true
			},
			bucket: process.env.S3_BUCKET || '',
			config: {
				region: process.env.S3_REGION || '',
				endpoint: process.env.S3_ENDPOINT || '',
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
					secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ''
				},
				forcePathStyle: true
			}
		}),
		seoPlugin({
			collections: ['posts'],
			// globals: ['get-started'],
			uploadsCollection: 'media'
		}),
		searchPlugin({
			collections: ['posts'],
			defaultPriorities: {
				posts: 20
			}
		}),
		redirectsPlugin({
			collections: ['posts'],
			overrides: {
				hooks: {
					afterChange: [revalidateRedirects]
				}
			}
		})
	]
})
