'use client'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { signOut } from '@/shared/utils/signOut'
import {
	Filter,
	LockKeyhole,
	LogOut,
	Settings,
	UserCog,
	Users
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { toast } from 'sonner'
// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const SettingsProfileSideMenu: React.FC<Props> = ({ className }) => {
	// const { formatMessage } = useIntl()
	const pathname = usePathname()
	const router = useRouter()

	const sideSettingsMenu = [
		{
			id: 1,
			// text: formatMessage({ id: 'settingsProfileSideMenu.profile' }),
			text: 'Профиль',
			icon: <UserCog />,
			path: '/settings/profile',
			disabled: false
		},
		{
			id: 2,
			// text: formatMessage({ id: 'settingsProfileSideMenu.account' }),
			text: 'Учетная запись',
			icon: <LockKeyhole />,
			path: '/settings/auth',
			disabled: false
		},
		{
			id: 3,
			// text: formatMessage({ id: 'settingsProfileSideMenu.relationships' }),
			text: 'Подписки и подписчики',
			icon: <Users />,
			path: '/settings/auth#2',
			disabled: true
		},
		{
			id: 4,
			// text: formatMessage({ id: 'settingsProfileSideMenu.filters' }),
			text: 'Фильтры',
			icon: <Filter />,
			path: '/settings/auth#3',
			disabled: true
		},
		{
			id: 5,
			// text: formatMessage({ id: 'settingsProfileSideMenu.settings' }),
			text: 'Настройки',
			icon: <Settings />,
			path: '/settings/preferences',
			disabled: false
		},
		{
			id: 6,
			// text: formatMessage({ id: 'settingsProfileSideMenu.logout' }),
			text: 'Выйти',
			icon: <LogOut />,
			path: '',
			click: 'handleSignOut'
		}
	]

	const handleSignOut = useCallback(async () => {
		let toastMessage = ''
		try {
			const result = await signOut()
			if (result.message) {
				toastMessage = 'Вы успешно вышли из аккаунта!'
				toast.error(toastMessage, {
					duration: 3000
				})
				router.refresh()
			}
		} catch (error) {
			console.error('Не удалось выйти:', error)
			toastMessage = 'Ошибка при выходе из аккаунта!'
			toast.error(toastMessage, {
				duration: 3000
			})
		}
	}, [router])

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
					onClick={() => {
						if (item.click === 'onClickSignOut') {
							handleSignOut() // Вызов функции выхода
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
