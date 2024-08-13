'use client'

import { LoginForm } from '@/shared/components/modals/auth-modal/forms/login-form'
import { RegisterForm } from '@/shared/components/modals/auth-modal/forms/register-form'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'
import React from 'react'

interface Props {
	open: boolean
	onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
	const [type, setType] = React.useState<'login' | 'register'>('login')

	const onSwitchType = () => {
		setType(type === 'login' ? 'register' : 'login')
	}

	const handleClose = () => {
		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='w-[450px] p-10'>
				{type === 'login' ? (
					<LoginForm onClose={handleClose} />
				) : (
					<RegisterForm onClose={handleClose} />
				)}

				<hr />
				<div className='flex gap-2'>
					<Button
						variant='secondary'
						onClick={() =>
							signIn('github', {
								callbackUrl: '/',
								redirect: true,
							})
						}
						type='button'
						className='gap-2 h-12 p-2 flex-1'
					>
						<Github size={24} />
						GitHub
					</Button>

					<Button
						variant='secondary'
						onClick={() =>
							signIn('google', {
								callbackUrl: '/',
								redirect: true,
							})
						}
						type='button'
						className='gap-2 h-12 p-2 flex-1'
					>
						<img
							className='w-6 h-6'
							src='/google24px.svg'
							alt='Google'
						/>
						Google
					</Button>
				</div>

				<Button
					variant='secondary'
					onClick={onSwitchType}
					type='button'
					className='h-12'
				>
					{type !== 'login' ? 'Войти' : 'Регистрация'}
				</Button>
			</DialogContent>
		</Dialog>
	)
}
