'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import {
	ChevronLeft,
	LockKeyhole,
	Settings,
	UserCog,
	Users
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const SettingsHostSideMenu: React.FC<Props> = ({
	className
}) => {
	// const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()

	const sideSettingsMenu = [
		{
			id: 1,
			// text: formatMessage({ id: 'settingsProfileSideMenu.main' }),
			text: 'Основные',
			icon: <Settings />,
			path: `/settings/host/main`,
			disabled: false
		},
		{
			id: 2,
			// text: formatMessage({ id: 'settingsProfileSideMenu.account' }),
			text: 'Права доступа',
			icon: <LockKeyhole />,
			path: `/settings/host/permissions`,
			disabled: true
		},
		{
			id: 3,
			// text: formatMessage({ id: 'settingsProfileSideMenu.relationships' }),
			text: 'Подписчики',
			icon: <Users />,
			path: '/settings/permissions#2',
			disabled: true
		},
		// {
		// 	id: 4,
		// 	// text: formatMessage({ id: 'settingsProfileSideMenu.filters' }),
		// 	text: 'Фильтры',
		// 	icon: <Filter />,
		// 	path: '/settings/permissions#3',
		// 	disabled: true
		// },
		{
			id: 4,
			// text: formatMessage({ id: 'settingsProfileSideMenu.settings' }),
			text: 'Администрирование',
			icon: <UserCog />,
			path: `/settings/host/administration`,
			disabled: false
		}
	]

	return (
		<div className={cn('', className)}>
			{sideSettingsMenu.map(item => (
				<Button
					key={item.id}
					variant='blue'
					type='button'
					disabled={item.disabled}
					className={cn(
						'flex gap-2 justify-start w-full mb-1 h-12 text-md font-bold bg-transparent hover:bg-blue-700 text-primary hover:text-white',
						`${
							pathname === item.path
								? 'bg-blue-800 hover:bg-blue-800 text-white'
								: ''
						}`
					)}
					onClick={() => router.push(item.path)}
				>
					{item.icon}
					{item.text}
				</Button>
			))}
		</div>
	)
}
