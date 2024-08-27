'use client'

import { Avatar, AvatarImage } from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu'
import { CircleUser } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
	avatarImage: string
	userUrl: string
	onClickSignIn?: () => void
	className?: string
}

export const ProfileButton: React.FC<Props> = ({
	                                               avatarImage,
	                                               userUrl,
	                                               onClickSignIn,
	                                               className
                                               }) => {
	const { data: session } = useSession()
	const router = useRouter()
	
	const onClickSignOut = () => {
		signOut({
			callbackUrl: '/'
		})
	}
	
	return (
		<div className={className}>
			{!session ? (
				<Button
					onClick={onClickSignIn}
					variant='secondary'
					className='flex items-center gap-2'
				>
					<CircleUser size={18} />
					Войти
				</Button>
			) : (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar
								className='border-2 border-transparent rounded-full cursor-pointer hover:border-blue-800 hover:bg-blue-800'>
								<AvatarImage
									className='m-auto rounded-full'
									src={avatarImage}
								/>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='bg-secondary'>
							<DropdownMenuItem
								className='cursor-pointer'
								onClick={() => router.push(userUrl)}
							>
								Профиль
							</DropdownMenuItem>
							<DropdownMenuItem
								className='cursor-pointer'
								onClick={() => router.push('/settings/profile')}
							>
								Настройки
							</DropdownMenuItem>
							<DropdownMenuItem
								className='cursor-pointer'
								onClick={() => onClickSignOut()}
							>
								Выйти
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			)}
		</div>
	)
}
