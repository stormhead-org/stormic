import { prisma } from '@/prisma/prisma-client'
import { Container } from '@/shared/components'
import { Header } from '@/shared/components/header/header'
import {
	SettingsProfileSideMenu
} from '@/shared/components/profiles/personal-profile-settings-items/settings-profile-side-menu'
import { getUserSession } from '@/shared/lib'
import type { Metadata } from 'next'
import React, { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

export default async function SettingsLayout({
	                                             children
                                             }: Readonly<{
	children: React.ReactNode
}>) {
	
	
	const session = await getUserSession()
	const user = session && await prisma.user.findUnique({ where: { id: Number(session?.id) } })
	
	const [logoImage, stormicName, description] = await Promise.all([
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
		})
	])
	
	return (
		<main className='min-h-screen'>
			<Suspense>
				<Header
					logoImage={logoImage?.url || '/logo.png'}
					stormicName={stormicName?.content || 'Stormic'}
					description={description?.content || 'код, GitHub и ты'}
					avatarImage={user?.profile_picture || ''}
					userUrl={'/u/' + String(user?.id) || ''}
				/>
			</Suspense>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					
					{/* Левая часть */}
					<div className='w-1/4 h-full'>
						<div className='h-3/4'>
							<SettingsProfileSideMenu />
						</div>
						{/* <div className='h-1/4 mt-20'> */}
						{/* 	<SideFooter className='mt-4' /> */}
						{/* </div> */}
					</div>
					
					{/* Правая часть */}
					<div className='w-3/4'>
						{children}
					</div>
				</div>
			</Container>
		</main>
	)
}
