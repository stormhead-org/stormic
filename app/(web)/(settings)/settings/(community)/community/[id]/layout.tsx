import { Container } from '@/shared/components'
import { SettingsCommunitySideMenu } from '@/shared/components/profiles/settings/community/settings-page-items/community-profile-settings-items/settings-community-side-menu'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Stormic: Настройки'
}

type Args = {
	params: {
		id?: string
	}
}

export default async function SettingsLayout({
	children,
	params: paramsPromise
}: Readonly<
	{
		children: React.ReactNode
	} & Args
>) {
	const { id } = await paramsPromise

	return (
		<>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-1/4 h-[calc(100vh-6rem)] overflow-auto no-scrollbar'>
						<div className='h-3/4'>
							{id && <SettingsCommunitySideMenu communityId={id} />}
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
