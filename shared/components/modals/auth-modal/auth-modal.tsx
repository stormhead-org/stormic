'use client'

import { LoginForm } from '@/shared/components/modals/auth-modal/forms/login-form'
import { RegisterForm } from '@/shared/components/modals/auth-modal/forms/register-form'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	open: boolean
	onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
	const { formatMessage } = useIntl()
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
						variant='blue'
						onClick={() =>
							signIn('github', {
								callbackUrl: '/',
								redirect: true
							})
						}
						type='button'
						className='flex w-full items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
					>
						<Github size={24} />
						GitHub
					</Button>
					
					<Button
						variant='blue'
						onClick={() =>
							signIn('google', {
								callbackUrl: '/',
								redirect: true
							})
						}
						type='button'
						className='flex w-full items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
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
					variant='blue'
					onClick={onSwitchType}
					type='button'
					className='flex items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
				>
					{type !== 'login' ? formatMessage({ id: 'loginForm.loginButton' }) : formatMessage({ id: 'registerForm.regButton' })}
				</Button>
			</DialogContent>
		</Dialog>
	)
}
