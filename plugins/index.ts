import { Post } from '@/payload-types'
import { revalidateRedirects } from '@/shared/hooks/revalidateRedirects'
import { getServerSideURL } from '@/shared/lib/getURL'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Plugin } from 'payload'

const generateTitle: GenerateTitle<Post> = ({ doc }) => {
	return doc?.title ? `${doc.title} | Stormic Community` : 'Stormic Community'
}
const generateURL: GenerateURL<Post> = ({ doc }) => {
	const url = getServerSideURL()

	return doc?.id ? `${url}/${doc.id}` : url
}

export const plugins: Plugin[] = [
	redirectsPlugin({
		collections: ['posts'],
		overrides: {
			// @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
			fields: ({ defaultFields }) => {
				return defaultFields.map(field => {
					if ('name' in field && field.name === 'from') {
						return {
							...field,
							admin: {
								description:
									'You will need to rebuild the website when changing this field.'
							}
						}
					}
					return field
				})
			},
			hooks: {
				afterChange: [revalidateRedirects]
			}
		}
	}),
	seoPlugin({
		generateTitle,
		generateURL
	})
]
