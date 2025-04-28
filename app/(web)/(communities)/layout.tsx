import { Community } from '@/payload-types'
import {
	Container,
	FeedUserMenu,
	NavigationMenuForm,
	SideFooter,
	SocialMenu
} from '@/shared/components'
import { CommunitiesForm } from '@/shared/components/communities/list-items/communities-form'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export default async function CommunitiesLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const payload = await getPayload({ config: configPromise })

	const globalSideBarNavigation = await payload.findGlobal({
		slug: 'sidebar-navigation', // required
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
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='hidden lg:block lg:w-1/4 lg:h-[calc(100vh-6rem)] lg:overflow-auto lg:no-scrollbar'>
						<div className='h-3/4'>
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
					</div>

					{/* Правая часть */}
					<div className='w-full lg:w-3/4 lg:h-[calc(100vh-6rem)] lg:overflow-auto lg:no-scrollbar rounded-xl'>
						{children}
					</div>
				</div>
			</Container>
		</>
	)
}
