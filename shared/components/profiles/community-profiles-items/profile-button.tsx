'use client'

import type { User } from '@/payload-types'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/shared/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu'
import { ModeToggle } from '@/shared/components/ui/ModeToggle'
import { signOut } from '@/shared/utils/api/users/signOut'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { CircleUser, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { toast } from 'sonner'

interface Props {
	currentUser?: User
	onClickSignIn?: () => void
	className?: string
}

export const ProfileButton: React.FC<Props> = ({
	currentUser,
	onClickSignIn,
	className
}) => {
	const router = useRouter()
	const [dropdownKey, setDropdownKey] = useState(Date.now()) // Уникальный ключ для DropdownMenu

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

	const handleSignInClick = () => {
		if (onClickSignIn) {
			onClickSignIn()
			setDropdownKey(Date.now())
		}
	}

	const avatarImageUrl =
		typeof currentUser?.avatar === 'object'
			? getMediaUrl(currentUser.avatar, '/logo.png')
			: '/logo.png'

	return (
		<div className={className}>
			{!currentUser ? (
				<DropdownMenu key={dropdownKey}>
					<DropdownMenuTrigger asChild>
						<CircleUser
							size={40}
							className='cursor-pointer text-foreground hover:text-theme p-1 bg-transparent hover:bg-secondary rounded-full'
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='bg-secondary'>
						<DropdownMenuItem className='flex justify-between gap-2'>
							<span className='text-foreground text-base'>Оформление</span>
							<ModeToggle />
						</DropdownMenuItem>
						<DropdownMenuItem
							className='flex cursor-pointer gap-2'
							onClick={handleSignInClick}
						>
							<LogIn size={22} />
							<span className='text-foreground text-base'>Войти</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<DropdownMenu key={dropdownKey}>
					<DropdownMenuTrigger asChild>
						<Avatar className='border-2 border-transparent rounded-full cursor-pointer hover:border-theme'>
							<AvatarImage
								className='m-auto rounded-full'
								src={avatarImageUrl}
							/>
							<AvatarFallback>
								<CircleUser />
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='bg-secondary'>
						<DropdownMenuItem
							className='cursor-pointer text-foreground text-base'
							onClick={() => router.push(`/u/${currentUser.id}`)}
						>
							Профиль
						</DropdownMenuItem>
						<DropdownMenuItem
							className='cursor-pointer text-foreground text-base'
							onClick={() => router.push(`/u/${currentUser.id}/drafts`)}
						>
							Черновики
						</DropdownMenuItem>
						<DropdownMenuItem
							className='cursor-pointer text-foreground text-base'
							onClick={() => router.push('/settings/user/profile')}
						>
							Настройки
						</DropdownMenuItem>
						<DropdownMenuItem className='flex justify-between gap-2 text-foreground text-base'>
							<span>Оформление</span>
							<ModeToggle />
						</DropdownMenuItem>
						<DropdownMenuItem
							className='cursor-pointer text-foreground text-base'
							onClick={handleSignOut}
						>
							Выйти
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	)
}
