import { Community } from '@/payload-types'
import {
	Container,
	FeedUserMenu,
	NavigationMenuForm,
	SideFooter,
	SocialMenu
} from '@/shared/components/'
import { CommentFeedGroup } from '@/shared/components/comments/comment-feed-group'
import { CommunitiesForm } from '@/shared/components/communities/list-items/communities-form'
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

	const globalSideBarNavigation = await payload.findGlobal({
		slug: 'sidebar-navigation',
		depth: 1,
		select: {
			items: true
		}
	})

	const resultCommunities = await payload.find({
		collection: 'communities',
		depth: 1,
		overrideAccess: false
		// select: {
		// 	id: true,
		//   title: true,
		// 	 content: true,
		//   slug: true,
		//   communities: true,
		//   meta: true,
		// },
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
						{/* <NewPostButton
							className='my-4'
							authorAvatar={String(user && user.profile_picture)}
							authorName={String(user && user.fullName)}
							authorUrl={String(user && '/u/' + user.id)}
							hasSession={!!user}
							logoImage={logoImage?.url || '/logo.png'}
							stormicName={stormicName?.content || 'Stormic'}
							authImage={authImage ? authImage?.url : stormicBanner?.url}
						/> */}
						<NavigationMenuForm
							className='mt-4'
							data={globalSideBarNavigation.items || []}
						/>
						<CommunitiesForm
							// title={formatMessage({ id: 'categoryGroup.communitiesPageLink' })}
							title={'Сообщества'}
							limit={5}
							defaultItems={communities.slice(0, 5)}
							items={communities}
							// loading={loading}
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
