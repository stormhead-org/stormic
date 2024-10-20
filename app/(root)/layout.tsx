import { prisma } from '@/prisma/prisma-client'
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
	
	const [logoImage, stormicName, stormicBanner, authImage, description] = await Promise.all([
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
		await prisma.stormicMedia.findFirst({
			where: {
				mediaType: 'BANNER'
			}
		}),
		await prisma.stormicMedia.findFirst({
			where: {
				mediaType: 'AUTH_IMAGE'
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
					authImage={authImage ? authImage?.url : stormicBanner?.url}
					description={description?.content || 'код, GitHub и ты'}
					avatarImage={user?.profile_picture || ''}
					userUrl={'/u/' + String(user?.id) || ''}
				/>
			</Suspense>
			{children}
			{/* {modal} */}
		</main>
	)
}
