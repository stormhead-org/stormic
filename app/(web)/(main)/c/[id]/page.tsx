import { CommunityNotFound } from '@/shared/components/info-blocks/community-not-found'
import { CommunityProfileGroup } from '@/shared/components/profiles/community-profile-group'
import { generateMeta } from '@/shared/lib/generateMeta'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

export default async function Community({
	params
}: {
	params: Promise<{ id?: string }>
}) {
	const resolvedParams = await params
	const id = resolvedParams.id ? Number(resolvedParams.id) : null

	const community = await queryCommunityById({ id })
	const posts = await queryPostByCommunityId({ id })

	if (!community) {
		return <CommunityNotFound />
	}

	return <CommunityProfileGroup posts={posts || []} community={community} />
}

// Генерация метаданных
export async function generateMetadata({
	params
}: {
	params: Promise<{ id?: string }>
}): Promise<Metadata> {
	const resolvedParams = await params
	const id = resolvedParams.id ? Number(resolvedParams.id) : null

	const community = await queryCommunityById({ id })

	return generateMeta({ doc: community })
}

// Функция для запроса сообщества по ID
const queryCommunityById = cache(async ({ id }: { id: number | null }) => {
	if (!id) return null

	const payload = await getPayload({ config: configPromise })

	const community = await payload.findByID({
		collection: 'communities',
		id: String(id),
		depth: 1
	})

	return community || null
})

// Функция для запроса постов по ID сообщества
const queryPostByCommunityId = cache(async ({ id }: { id: number | null }) => {
	if (!id) return null

	const { isEnabled: draft } = await draftMode()

	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: 'posts',
		draft,
		overrideAccess: draft,
		pagination: false,
		where: {
			community: {
				some: {
					id: {
						equals: id
					}
				}
			}
		} as any
	})

	return result.docs || null
})
