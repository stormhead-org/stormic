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
		path: '/settings/relationships'
	},
	{
		id: 4,
		text: 'Фильтры',
		icon: <Filter />,
		path: '/settings/filters'
	},
	{
		id: 5,
		text: 'Настройки',
		icon: <Settings />,
		path: '/settings/preferences'
	},
	{
		id: 6,
		text: 'Выйти',
		icon: <LogOut />,
		path: '',
		click: 'onClickSignOut' // Эта строка будет сопоставлена с функцией выхода
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
							'flex items-center justify-between w-full h-12 rounded-[6px] hover:bg-secondary/50 cursor-pointer mb-[1px]',
							`${pathname === item.path ? 'bg-secondary/50' : ''}`
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
