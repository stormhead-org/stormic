import { prisma } from '@/prisma/prisma-client'
import {
	CommunitiesListGroup,
	Container,
	FeedUserMenu,
	NavigationMenuForm,
	NewPostButton,
	SideFooter,
	SocialMenu
} from '@/shared/components/'
import { CommentFeedGroup } from '@/shared/components/comments/comment-feed-group'
import { getUserSession } from '@/shared/lib'
import type { Metadata } from 'next'
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
	
	const session = await getUserSession()
	const user = session && await prisma.user.findUnique({ where: { id: Number(session?.id) } })
	
	const [menu] = await Promise.all([
		await prisma.navigationMenu.findMany()
	])
	
	return (
		<>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-1/4 h-[91vh] overflow-auto no-scrollbar rounded-md'>
						<FeedUserMenu />
						<SocialMenu
							className='my-2'
						/>
						<NewPostButton
							className='my-4'
							authorAvatar={String(user && user.profile_picture)}
							authorName={String(user && user.fullName)}
							authorUrl={String(user && '/u/' + user.id)}
							hasSession={!!user}
						/>
						<NavigationMenuForm className='mt-4' data={menu} />
						<CommunitiesListGroup className='mt-4' hasPost={false} />
						<SideFooter className='mt-4' />
					</div>
					
					{/* Центральная часть */}
					<div className='w-2/4 h-[91vh] overflow-auto no-scrollbar rounded-md'>
						{children}
					</div>
					
					{/* Правая часть */}
					<div className='w-1/4 flex flex-col h-[91vh] overflow-auto no-scrollbar'>
						<CommentFeedGroup />
					</div>
				</div>
			</Container>
		</>
	)
}
