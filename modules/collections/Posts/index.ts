import type { CollectionConfig } from 'payload'
import {
	BlocksFeature,
	FixedToolbarFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	lexicalEditor
} from '@payloadcms/richtext-lexical'
import { authenticated } from '@/modules/access/authenticated'
import { authenticatedOrPublished } from '@/modules/access/authenticatedOrPublished'
import { Banner } from '@/modules/collections/blocks/Banner/config'
import { Code } from '@/modules/collections/blocks/Code/config'
import { MediaBlock } from '@/modules/collections/blocks/MediaBlock/config'
import { generatePreviewPath } from '@/shared/lib/generatePreviewPath'
import { Author } from './hooks/author'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'
import { slugField } from '@/fields/slug'
import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField
} from '@payloadcms/plugin-seo/fields'
import { RelatedPost } from './hooks/relatedPost'

export const Posts: CollectionConfig<'posts'> = {
	slug: 'posts',
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated
	},
	defaultPopulate: {
		content: true,
		heroImage: true,
		author: true,
		relatedPost: true,
		createdAt: true,
		title: true,
		slug: true,
		community: true,
		meta: {
			image: true,
			description: true
		}
	},
	admin: {
		defaultColumns: ['title', 'slug', 'updatedAt'],
		livePreview: {
			url: ({ data, req }) => {
				const path = generatePreviewPath({
					slug: typeof data?.slug === 'string' ? data.slug : '',
					collection: 'posts',
					req
				})

				return path
			}
		},
		preview: (data, { req }) =>
			generatePreviewPath({
				slug: typeof data?.slug === 'string' ? data.slug : '',
				collection: 'posts',
				req
			}),
		useAsTitle: 'title'
	},
	fields: [
		{
			label: 'Название',
			name: 'title',
			type: 'text',
			required: true
		},
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Content',
					fields: [
						{
							name: 'heroImage',
							type: 'upload',
							relationTo: 'media'
						},
						{
							name: 'content',
							type: 'richText',
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										HeadingFeature({
											enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
										}),
										BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
										FixedToolbarFeature(),
										InlineToolbarFeature(),
										HorizontalRuleFeature()
									]
								}
							}),
							label: false,
							required: true
						},
						{
							label: 'Комментарии к посту',
							name: 'relatedComments',
							type: 'join',
							collection: 'comments',
							on: 'parentPost',
							maxDepth: 1
						}
					]
				},
				{
					label: 'Meta',
					fields: [
						{
							name: 'relatedPost',
							type: 'relationship',
							admin: {
								position: 'sidebar'
							},
							filterOptions: ({ id }) => {
								return {
									id: {
										not_in: [id]
									}
								}
							},
							hasMany: false,
							relationTo: 'posts'
						},
						{
							name: 'community',
							type: 'relationship',
							admin: {
								position: 'sidebar'
							},
							hasMany: false,
							relationTo: 'communities'
						}
					]
				},
				{
					name: 'meta',
					label: 'SEO',
					fields: [
						OverviewField({
							titlePath: 'meta.title',
							descriptionPath: 'meta.description',
							imagePath: 'meta.image'
						}),
						MetaTitleField({
							hasGenerateFn: true
						}),
						MetaImageField({
							relationTo: 'media'
						}),

						MetaDescriptionField({})
						// PreviewField({
						// 	if the `generateUrl` function is configured
						// 	hasGenerateFn: true,

						// 	field paths to match the target field for data
						// 	titlePath: 'meta.title',
						// 	descriptionPath: 'meta.description'
						// })
					]
				}
			]
		},
		// {
		// 	name: 'publishedAt',
		// 	type: 'date',
		// 	admin: {
		// 		date: {
		// 			pickerAppearance: 'dayAndTime'
		// 		},
		// 		position: 'sidebar'
		// 	},
		// 	hooks: {
		// 		beforeChange: [
		// 			({ siblingData, value }) => {
		// 				if (siblingData._status === 'published' && !value) {
		// 					return new Date()
		// 				}
		// 				return value
		// 			}
		// 		]
		// 	}
		// },
		{
			label: 'Автор',
			name: 'owner',
			type: 'relationship',
			admin: {
				position: 'sidebar'
			},
			hasMany: false,
			relationTo: 'users'
		},
		// This field is only used to populate the user data via the `author` hook
		// This is because the `user` collection has access control locked to protect user privacy
		// GraphQL will also not return mutated user data that differs from the underlying schema
		{
			name: 'author',
			type: 'text',
			access: {
				update: () => false
			},
			admin: {
				disabled: true,
				readOnly: true
			}
		}
		// ...slugField()
	],
	hooks: {
		afterChange: [revalidatePost],
		afterRead: [Author, RelatedPost],
		afterDelete: [revalidateDelete]
	},
	versions: {
		drafts: {
			autosave: {
				interval: 100
			},
			schedulePublish: true
		},
		maxPerDoc: 50
	}
}
