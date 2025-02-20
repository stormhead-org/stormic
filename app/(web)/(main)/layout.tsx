import { Community } from '@/payload-types'
import {
	CommunitiesListGroup,
	Container,
	FeedUserMenu,
	NavigationMenuForm,
	SideFooter,
	SocialMenu
} from '@/shared/components/'
import { CommentFeedGroup } from '@/shared/components/comments/comment-feed-group'
import config from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

export const metadata: Metadata = {
	title: 'Stormic Community'
}

export default async function MainLayout({
	children
}: {
	children: React.ReactNode
}) {
	const payload = await getPayload({ config })

	const globalSideBarNavigation = await payload.findGlobal({
		slug: 'sidebar-navigation', // required
		depth: 1,
		select: {
			items: true
		}
	})

	const resultCommunities = await payload.find({
		collection: 'communities',
		depth: 1
	})

	const communities = resultCommunities.docs as Community[]

	return (
		<>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-1/4 h-[91vh] overflow-auto no-scrollbar rounded-md'>
						<FeedUserMenu />
						<SocialMenu className='my-2' />
						<NavigationMenuForm
							className='mt-4'
							data={[globalSideBarNavigation]}
							// data={globalSideBarNavigation.items || []}
						/>
						<CommunitiesListGroup
							data={communities}
							className='mt-4'
							hasPost={false}
						/>
						<SideFooter className='mt-4' />
					</div>
					{/* Центральная часть */}
					<div className='w-2/4 h-[91vh] overflow-auto no-scrollbar rounded-md'>
						{children}
					</div>
					{/* Правая часть */}
					<div className='w-1/4'>
						<CommentFeedGroup />
					</div>
				</div>
			</Container>
		</>
	)
}
