import { Container } from '@/shared/components'
import {
	SettingsHostSideMenu
} from '@/shared/components/host/settings/settings-page-items/community-profile-settings-items/settings-host-side-menu'
import { SettingsCommunitySideMenu } from '@/shared/components/profiles/settings/community/settings-page-items/community-profile-settings-items/settings-community-side-menu'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Stormic: Настройки'
}

export default async function SettingsLayout({
	children,
}: Readonly<
	{
		children: React.ReactNode
	}
>) {

	return (
		<>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-1/4 h-full'>
						<div className='h-3/4'>
							<SettingsHostSideMenu />
						</div>
					</div>

					{/* Правая часть */}
					<div className='w-3/4'>{children}</div>
				</div>
			</Container>
		</>
	)
}
