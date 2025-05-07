'use client'

import { User } from '@/payload-types'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useSession } from '@/shared/providers/items/SessionProvider'
import { signOut } from '@/shared/utils/api/users/signOut'
import {
	ChevronLeft,
	Filter,
	LockKeyhole,
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
	const session = useSession()
	const currentUser = session && (session.user as User)

	const sideSettingsMenu = [
		{
			id: 1,
			// text: formatMessage({ id: 'settingsProfileSideMenu.main' }),
			text: 'Профиль',
			icon: <UserCog />,
			path: '/settings/user/profile',
			disabled: false
		},
		// {
		// 	id: 2,
		// 	// text: formatMessage({ id: 'settingsProfileSideMenu.account' }),
		// 	text: 'Учетная запись',
		// 	icon: <LockKeyhole />,
		// 	path: '/settings/auth',
		// 	disabled: true
		// },
		// {
		// 	id: 3,
		// 	// text: formatMessage({ id: 'settingsProfileSideMenu.relationships' }),
		// 	text: 'Подписки и подписчики',
		// 	icon: <Users />,
		// 	path: '/settings/auth#2',
		// 	disabled: true
		// },
		// {
		// 	id: 4,
		// 	// text: formatMessage({ id: 'settingsProfileSideMenu.filters' }),
		// 	text: 'Фильтры',
		// 	icon: <Filter />,
		// 	path: '/settings/auth#3',
		// 	disabled: true
		// },
		// {
		// 	id: 5,
		// 	// text: formatMessage({ id: 'settingsProfileSideMenu.settings' }),
		// 	text: 'Настройки',
		// 	icon: <Settings />,
		// 	path: '/settings/preferences',
		// 	disabled: true
		// },
		{
			id: 2,
			// text: formatMessage({ id: 'settingsProfileSideMenu.logout' }),
			text: 'В профиль',
			icon: <ChevronLeft />,
			path: `/u/${currentUser?.id}`,
			disabled: false
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
						'flex gap-2 justify-start w-full mb-1 h-12 text-md font-bold bg-transparent hover:bg-theme text-foreground hover:text-background rounded-xl',
						`${
							pathname === item.path
								? 'bg-theme-hover hover:bg-theme-hover text-background'
								: ''
						}`
					)}
					// onClick={() => {
					// 	if (item.click === 'onClickSignOut') {
					// 		handleSignOut() // Вызов функции выхода
					// 	} else if (item.path) {
					// 		router.push(item.path) // Переход по пути
					// 	}
					// }}
					onClick={() => router.push(item.path)}
				>
					{item.icon}
					{item.text}
				</Button>
			))}
		</div>
	)
}
