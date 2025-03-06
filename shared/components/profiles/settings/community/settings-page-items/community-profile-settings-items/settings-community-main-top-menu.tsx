'use client'

import type { Community } from '@/payload-types'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	data: Community
	className?: string
}

export const SettingsCommunityMainTopMenu: React.FC<Props> = ({ data, className }) => {
	// const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()

	const topMenuButtons = [
		{
			id: 1,
			// text: formatMessage({ id: 'profileEditTopMenu.editProfile' }),
			text: 'Сообщество',
			path: `/settings/community/${data.id}/main`,
			disabled: false
		},
		{
			id: 2,
			// text: formatMessage({ id: 'profileEditTopMenu.privacyAndReach' }),
			text: 'Внешний вид',
			path: `/settings/community/${data.id}/main#2`,
			disabled: true
		},
		{
			id: 3,
			// text: formatMessage({ id: 'profileEditTopMenu.verification' }),
			text: 'Верификация ссылок',
			path: `/settings/community/${data.id}/main#3`,
			disabled: true
		}
	]

	return (
		<div className={cn('flex flex-1 rounded-md gap-1', className)}>
			{topMenuButtons.map(item => (
				<Button
					key={item.id}
					variant='blue'
					type='button'
					disabled={item.disabled}
					className={cn(
						'h-12 flex-1 text-md font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white',
						`${
							pathname === item.path
								? 'bg-blue-800 hover:bg-blue-800 text-white'
								: ''
						}`
					)}
					onClick={() => router.push(item.path)}
				>
					{item.text}
				</Button>
			))}
		</div>
	)
}
