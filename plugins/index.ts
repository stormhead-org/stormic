import { Page, Post } from '@/payload-types'
import { revalidateRedirects } from '@/shared/hooks/revalidateRedirects'
import { getServerSideURL } from '@/shared/lib/getURL'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import {
	FixedToolbarFeature,
	HeadingFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Plugin } from 'payload'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
	return doc?.title ? `${doc.title} | Stormic Community` : 'Stormic Community'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
	const url = getServerSideURL()

	return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
	redirectsPlugin({
		collections: ['pages', 'posts'],
		overrides: {
			// @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
			fields: ({ defaultFields }) => {
				return defaultFields.map(field => {
					if ('name' in field && field.name === 'from') {
						return {
							...field,
							admin: {
								description:
									'You will need to rebuild the website when changing this field.',
							},
						}
					}
					return field
				})
			},
			hooks: {
				afterChange: [revalidateRedirects],
			},
		},
	}),
	seoPlugin({
		generateTitle,
		generateURL,
	}),
	formBuilderPlugin({
		fields: {
			payment: false,
		},
		formOverrides: {
			fields: ({ defaultFields }) => {
				return defaultFields.map(field => {
					if ('name' in field && field.name === 'confirmationMessage') {
						return {
							...field,
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										FixedToolbarFeature(),
										HeadingFeature({
											enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
										}),
									]
								},
							}),
						}
					}
					return field
				})
			},
		},
	}),
]
