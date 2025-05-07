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

interface Props {
	communityId: string
	className?: string
}

export const SettingsCommunitySideMenu: React.FC<Props> = ({
	communityId,
	className
}) => {
	const pathname = usePathname()
	const router = useRouter()

	const sideSettingsMenu = [
		{
			id: 1,
			text: 'Основные',
			icon: <Settings />,
			path: `/settings/community/${communityId}/main`,
			disabled: false
		},
		{
			id: 2,
			text: 'Права доступа',
			icon: <LockKeyhole />,
			path: `/settings/community/${communityId}/permissions/roles`,
			includePaths: [
				`/settings/community/${communityId}/permissions/roles`,
				`/settings/community/${communityId}/permissions/bans`,
				`/settings/community/${communityId}/permissions/mutes`
			],
			disabled: false
		},
		{
			id: 3,
			text: 'Подписчики',
			icon: <Users />,
			path: '/settings/permissions#2',
			disabled: true
		},
		{
			id: 4,
			text: 'Администрирование',
			icon: <UserCog />,
			path: `/settings/community/${communityId}/administration`,
			disabled: false
		},
		{
			id: 5,
			text: 'В сообщество',
			icon: <ChevronLeft />,
			path: `/c/${communityId}`,
			disabled: false
		}
	]

	return (
		<div className={cn('', className)}>
			{sideSettingsMenu.map(item => {
				const isActive = item.includePaths
					? pathname && item.includePaths.includes(pathname)
					: pathname === item.path

				const buttonStyles = isActive
					? 'bg-theme hover:bg-theme text-background'
					: 'bg-transparent hover:bg-theme hover:text-background text-foreground'

				return (
					<Button
						key={item.id}
						variant='blue'
						type='button'
						disabled={item.disabled}
						className={cn(
							'flex gap-2 justify-start w-full mb-1 h-12 text-md font-bold rounded-xl',
							buttonStyles
						)}
						onClick={() => router.push(item.path)}
					>
						{item.icon}
						{item.text}
					</Button>
				)
			})}
		</div>
	)
}
