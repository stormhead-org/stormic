import { Button } from '@/shared/components/ui/button'
import { CircleUser } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface Props {
	onClickSignIn?: () => void
	className?: string
}

export const ProfileButton: React.FC<Props> = ({
	className,
	onClickSignIn,
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
					<Button variant='secondary' className='flex items-center'>
						<CircleUser size={18} />
					</Button>
				</Link>
			)}
		</div>
	)
}
