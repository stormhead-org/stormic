import { User } from '@/payload-types'
import { Container } from '@/shared/components'
import { SettingsHostSideMenu } from '@/shared/components/host/settings/settings-page-items/community-profile-settings-items/settings-host-side-menu'
import { AccessDenied } from '@/shared/components/info-blocks/access-denied'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

export const metadata: Metadata = {
	title: 'Stormic: Настройки'
}

export default async function SettingsLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = (await getSession()) as { user: User } | null
	const currentUser = session?.user

	const payload = await getPayload({ config: configPromise })

	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 2
	})

	if (currentUser && currentUser.id !== resultGlobalHost.owner.id) {
		return <AccessDenied />
	}

	return (
		<>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-1/4 h-[calc(100vh-6rem)] overflow-auto no-scrollbar'>
						<div className='h-3/4'>
							<SettingsHostSideMenu />
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
