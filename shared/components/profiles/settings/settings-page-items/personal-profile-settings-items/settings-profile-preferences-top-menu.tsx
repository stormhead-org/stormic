'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const SettingsProfilePreferencesTopMenu: React.FC<Props> = ({
	className
}) => {
	// const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()

	const topMenuButtons = [
		{
			id: 1,
			// text: formatMessage({ id: 'profilePreferencesTopMenu.appearance' }),
			text: 'Внешний вид',
			path: '/settings/preferences',
			disabled: false
		},
		{
			id: 2,
			// text: formatMessage({ id: 'profilePreferencesTopMenu.notifications' }),
			text: 'Email уведомления',
			path: '/settings/profile#2',
			disabled: true
		},
		{
			id: 3,
			// text: formatMessage({ id: 'profilePreferencesTopMenu.other' }),
			text: 'Остальное',
			path: '/settings/profile#3',
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
