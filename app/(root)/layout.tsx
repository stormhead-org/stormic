import { prisma } from '@/prisma/prisma-client'
import {
	CategoryGroup,
	Container,
	FeedUserMenu,
	NavigationMenuForm,
	NewPostButton,
	SideFooter,
	SocialMenu,
	Title
} from '@/shared/components/'
import { CommentFeedGroup } from '@/shared/components/comments/comment-feed-group'
import { Header } from '@/shared/components/header/header'
import { getUserSession } from '@/shared/lib'
import type { Metadata } from 'next'
import React, { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Stormic Community'
}

export default async function HomeLayout({
	                                         children,
	                                         modal
                                         }: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	
	const session = await getUserSession()
	const user = session && await prisma.user.findUnique({ where: { id: Number(session?.id) } })
	
	const [logoImage, stormicName, description, menu] = await Promise.all([
		await prisma.stormicMedia.findFirst({
			where: {
				mediaType: 'LOGO'
			}
		}),
		await prisma.stormicSettings.findFirst({
			where: {
				settingsType: 'NAME'
			}
		}),
		await prisma.stormicSettings.findFirst({
			where: {
				settingsType: 'DESCRIPTION'
			}
		}),
		await prisma.navigationMenu.findMany()
	])
	
	return (
		<main className='min-h-screen'>
			<Suspense>
				<Header
					logoImage={logoImage?.url || '/logo.png'}
					stormicName={stormicName?.content || 'Stormic'}
					description={description?.content || 'код, GitHub и ты'}
					avatarImage={user?.profile_picture || ''}
				/>
			</Suspense>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-1/4'>
						<FeedUserMenu />
						<SocialMenu className='my-2' />
						<NewPostButton
							className='my-4'
							authorAvatar={String(user && user.profile_picture)}
							authorName={String(user && user.fullName)}
							authorUrl={String(user && '/u/' + user.id)}
							hasSession={!!user} />
						<NavigationMenuForm className='mt-4' data={menu} />
						<CategoryGroup className='mt-4' hasPost={false} />
						<SideFooter className='mt-4' />
					</div>
					
					{/* Центральная часть */}
					<div className='w-2/4'>
						{children}
					</div>
					
					
					{/* Правая часть */}
					<div className='w-1/4'>
						<Title
							text='Сейчас обсуждают'
							size='sm'
							className='font-bold flex items-center w-full h-12 rounded-[6px] bg-secondary/50 pl-2'
						/>
						<CommentFeedGroup />
					</div>
				</div>
			</Container>
			{modal}
		</main>
	)
}
