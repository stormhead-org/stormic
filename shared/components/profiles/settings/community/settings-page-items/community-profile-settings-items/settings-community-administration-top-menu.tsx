'use client'

import { Community } from '@/payload-types'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	data: Community
	className?: string
}

export const SettingsCommunityAdministrationTopMenu: React.FC<Props> = ({
	data,
	className
}) => {
	// const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()

	const topMenuButtons = [
		{
			id: 1,
			// text: formatMessage({ id: 'profilePreferencesTopMenu.appearance' }),
			text: 'Правила',
			path: `/settings/community/${data.id}/administration`,
			disabled: false
		}
		// {
		// 	id: 2,
		// 	// text: formatMessage({ id: 'profilePreferencesTopMenu.notifications' }),
		// 	text: 'Email уведомления',
		// 	path: '/settings/main#2',
		// 	disabled: true
		// },
		// {
		// 	id: 3,
		// 	// text: formatMessage({ id: 'profilePreferencesTopMenu.other' }),
		// 	text: 'Остальное',
		// 	path: '/settings/main#3',
		// 	disabled: true
		// }
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
						'h-12 flex-1 text-md font-bold bg-secondary hover:bg-theme-hover text-foreground hover:text-background rounded-xl',
						`${
							pathname === item.path
								? 'bg-theme/80 hover:bg-theme-hover text-background'
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
