'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { Filter, LockKeyhole, LogOut, Settings, UserCog, Users } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const SettingsProfileSideMenu: React.FC<Props> = ({ className }) => {
	const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()
	
	const onClickSignOut = () => {
		signOut({
			callbackUrl: '/'
		})
	}
	
	const sideSettingsMenu = [
		{
			id: 1,
			text: formatMessage({ id: 'settingsProfileSideMenu.profile' }),
			icon: <UserCog />,
			path: '/settings/profile',
			disabled: false
		},
		{
			id: 2,
			text: formatMessage({ id: 'settingsProfileSideMenu.account' }),
			icon: <LockKeyhole />,
			path: '/settings/auth',
			disabled: false
		},
		{
			id: 3,
			text: formatMessage({ id: 'settingsProfileSideMenu.relationships' }),
			icon: <Users />,
			path: '/settings/auth#2',
			disabled: true
		},
		{
			id: 4,
			text: formatMessage({ id: 'settingsProfileSideMenu.filters' }),
			icon: <Filter />,
			path: '/settings/auth#3',
			disabled: true
		},
		{
			id: 5,
			text: formatMessage({ id: 'settingsProfileSideMenu.settings' }),
			icon: <Settings />,
			path: '/settings/preferences',
			disabled: false
		},
		{
			id: 6,
			text: formatMessage({ id: 'settingsProfileSideMenu.logout' }),
			icon: <LogOut />,
			path: '',
			click: 'onClickSignOut'
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
							`${pathname === item.path ? 'bg-blue-800 hover:bg-blue-800 text-white' : ''}`
						)}
						onClick={() => {
							if (item.click === 'onClickSignOut') {
								onClickSignOut() // Вызов функции выхода
							} else if (item.path) {
								router.push(item.path) // Переход по пути
							}
						}}
					>
						{item.icon}
						{item.text}
					</Button>
				))}
		</div>
	)
}
