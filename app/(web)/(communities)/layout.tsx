import { Community, User } from '@/payload-types'
import {
	Container,
	FeedUserMenu,
	NavigationMenuForm,
	// NewPostButton,
	SideFooter,
	SocialMenu
} from '@/shared/components'
import { CommunitiesForm } from '@/shared/components/communities/list-items/communities-form'
import { getSession } from '@/shared/lib/auth'
// import { getUserSession } from '@/shared/lib'
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
	const user = session && session.user

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
		depth: 1,
		overrideAccess: false
	})

	const communities = resultCommunities.docs as Community[]

	return (
		<>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-1/4 h-full'>
						<div className='h-3/4'>
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
					</div>

					{/* Правая часть */}
					<div className='w-3/4'>{children}</div>
				</div>
			</Container>
		</>
	)
}
