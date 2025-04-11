import { Community, User } from '@/payload-types'
import {
	Container,
	FeedUserMenu,
	NavigationMenuForm,
	SideFooter,
	SocialMenu
} from '@/shared/components'
import { CommunitiesForm } from '@/shared/components/communities/list-items/communities-form'
import { NewPostButton } from '@/shared/components/new-post-button'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export default async function CommunitiesLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const payload = await getPayload({ config: configPromise })

	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings', // required
		depth: 1
	})

	const globalSideBarNavigation = await payload.findGlobal({
		slug: 'sidebar-navigation', // required
		depth: 1,
		select: {
			items: true
		}
	})

	const resultCommunities = await payload.find({
		collection: 'communities',
		where: {
			COMMUNITY_HAS_BANNED: {
				equals: false
			}
		},
		depth: 2,
		pagination: false,
		overrideAccess: false
	})

	const communities = resultCommunities.docs as Community[]

	return (
		<>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-1/4 h-[calc(100vh-6rem)] overflow-auto no-scrollbar'>
						<div className='h-3/4'>
							<FeedUserMenu />
							<SocialMenu className='my-2' />
							<NewPostButton
								host={resultGlobalHost}
								communities={communities}
								currentUser={currentUser !== null ? currentUser : undefined}
								className='my-4'
							/>
							<NavigationMenuForm
								className='mt-4'
								data={globalSideBarNavigation}
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
					</div>

					{/* Правая часть */}
					<div className='w-3/4 h-[calc(100vh-6rem)] overflow-auto no-scrollbar rounded-md'>
						{children}
					</div>
				</div>
			</Container>
		</>
	)
}
