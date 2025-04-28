import { Community, User } from '@/payload-types'
import {
	Container,
	FeedUserMenu,
	NavigationMenuForm,
	SideFooter,
	SocialMenu
} from '@/shared/components/'
import { CommentFeedGroup } from '@/shared/components/comments/comment-feed-group'
import { CommunitiesForm } from '@/shared/components/communities/list-items/communities-form'
import { getSession } from '@/shared/lib/auth'
import config from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

export const metadata: Metadata = {
	title: 'Stormic Community'
}

export default async function MainLayout({
	children
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	const payload = await getPayload({ config })

	const session = (await getSession()) as { user: User } | null

	const globalSideBarNavigation = await payload.findGlobal({
		slug: 'sidebar-navigation',
		depth: 1,
		select: {
			items: true
		}
	})

	const resultSocialNavigation = await payload.findGlobal({
		slug: 'social-navigation',
		depth: 2
	})

	const resultCommunities = await payload.find({
		collection: 'communities',
		where: {
			COMMUNITY_HAS_BANNED: {
				equals: false
			}
		},
		sort: 'id',
		depth: 2,
		pagination: false,
		overrideAccess: false
	})

	const communities = resultCommunities.docs as Community[]

	return (
		<>
			<Container className='lg:mt-4'>
				<div className='lg:flex lg:gap-4'>
					{/* Левая часть */}
					<div className='hidden lg:block lg:w-1/4 lg:h-[calc(100vh-6rem)] lg:overflow-auto lg:no-scrollbar'>
						<FeedUserMenu />

						<CommunitiesForm
							limit={10}
							items={communities}
							className='mt-1'
							// loading={loading}
						/>

						<SocialMenu
							socialNavigation={resultSocialNavigation}
							className='mt-1'
						/>

						<NavigationMenuForm data={globalSideBarNavigation} />

						<SideFooter className='border-t border-theme pt-1 mt-1 rounded-xl' />
					</div>
					{/* Центральная часть */}
					<div className='w-full lg:w-2/4 lg:h-[calc(100vh-6rem)] lg:overflow-auto lg:no-scrollbar lg:rounded-xl'>
						{children}
					</div>

					{/* Правая часть */}
					<div className='hidden lg:block lg:w-1/4 lg:h-[calc(100vh-6rem)] lg:overflow-auto lg:no-scrollbar lg:rounded-xl'>
						<CommentFeedGroup />
					</div>
				</div>
			</Container>
		</>
	)
}
