import { ProfileAvatar } from '@/shared/components/profiles/profile-items/profile-avatar'
import { Button } from '@/shared/components/ui/button'
import { CircleUser } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface Props {
	avatarImage: string
	onClickSignIn?: () => void
	className?: string
}

export const ProfileButton: React.FC<Props> = ({
	                                               avatarImage,
	                                               onClickSignIn,
	                                               className
                                               }) => {
	const { data: session } = useSession()
	
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
				<Link href='/profile'>
					<ProfileAvatar avatarImage={avatarImage} />
				</Link>
			)}
		</div>
	)
}
