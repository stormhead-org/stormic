'use client'

import { cn } from '@/shared/lib/utils'
import { Filter, LockKeyhole, LogOut, Settings, UserCog, Users } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const sideSettingsMenu = [
	{
		id: 1,
		text: 'Профиль',
		icon: <UserCog />,
		path: '/settings/profile'
	},
	{
		id: 2,
		text: 'Учетная запись',
		icon: <LockKeyhole />,
		path: '/settings/auth'
	},
	{
		id: 3,
		text: 'Подписки и подписчики',
		icon: <Users />,
		path: '/settings/auth#2'
	},
	{
		id: 4,
		text: 'Фильтры',
		icon: <Filter />,
		path: '/settings/auth#3'
	},
	{
		id: 5,
		text: 'Настройки',
		icon: <Settings />,
		path: '/settings/auth#4'
	},
	{
		id: 6,
		text: 'Выйти',
		icon: <LogOut />,
		path: '',
		click: 'onClickSignOut'
	}
]

interface Props {
	className?: string
}

export const SettingsProfileSideMenu: React.FC<Props> = ({ className }) => {
	const pathname = usePathname()
	const router = useRouter()
	
	const onClickSignOut = () => {
		signOut({
			callbackUrl: '/'
		})
	}
	
	return (
		<div className={cn('', className)}>
			<ul>
				{sideSettingsMenu.map(item => (
					<li
						key={item.id}
						className={cn(
							'flex items-center justify-between w-full h-12 rounded-[6px] hover:bg-blue-800 hover:text-white cursor-pointer mb-1',
							`${pathname === item.path ? 'bg-blue-800 text-white' : ''}`
						)}
						onClick={() => {
							if (item.click === 'onClickSignOut') {
								onClickSignOut() // Вызов функции выхода
							} else if (item.path) {
								router.push(item.path) // Переход по пути
							}
						}}
					>
						<div className='flex items-center gap-2 ml-2'>
							{item.icon}
							<Link href={item.path || '#'} onClick={e => {
								if (item.click === 'onClickSignOut') {
									e.preventDefault() // Предотвращение перехода по ссылке
									onClickSignOut() // Вызов функции выхода
								}
							}} className='text-lg font-bold'>
								{item.text}
							</Link>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
