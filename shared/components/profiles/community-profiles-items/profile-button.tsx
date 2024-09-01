'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
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
import { useIntl } from 'react-intl'

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
	const { formatMessage } = useIntl()
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
					className='flex items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white rounded-full'
				>
					<CircleUser size={18} />
					{formatMessage({ id: 'profileButton.login' })}
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
								<AvatarFallback>
									<CircleUser />
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='bg-secondary'>
							<DropdownMenuItem
								className='cursor-pointer'
								onClick={() => router.push(userUrl)}
							>
								{formatMessage({ id: 'profileButton.profile' })}
							</DropdownMenuItem>
							<DropdownMenuItem
								className='cursor-pointer'
								onClick={() => router.push('/settings/profile')}
							>
								{formatMessage({ id: 'profileButton.Settings' })}
							</DropdownMenuItem>
							<DropdownMenuItem
								className='cursor-pointer'
								onClick={() => onClickSignOut()}
							>
								{formatMessage({ id: 'profileButton.logout' })}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			)}
		</div>
	)
}
