import { Container } from '@/shared/components'
import { SettingsProfileSideMenu } from '@/shared/components/profiles/settings/user/settings-page-items/personal-profile-settings-items/settings-profile-side-menu'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Stormic: Настройки'
}

export default async function SettingsLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-1/4 h-full'>
						<div className='h-3/4'>
							<SettingsProfileSideMenu />
						</div>
					</div>

					{/* Правая часть */}
					<div className='w-3/4'>{children}</div>
				</div>
			</Container>
		</>
	)
}
