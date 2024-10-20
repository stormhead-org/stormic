'use client'

import { EmailForm } from '@/shared/components/modals/auth-modal/forms/email-form'
import { LoginForm } from '@/shared/components/modals/auth-modal/forms/login-form'
import { RegisterForm } from '@/shared/components/modals/auth-modal/forms/register-form'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	stormicName: string
	logoImage?: string
	authImage?: string
	open: boolean
	onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ stormicName, logoImage, authImage, open, onClose }) => {
	const { formatMessage } = useIntl()
	const [type, setType] = React.useState<'login' | 'email' | 'register' | 'passwordReset'>('login')
	
	const onSwitchType = () => {
		setType(type === 'login' ? 'register' : 'login')
	}
	
	const handleClose = () => {
		onClose()
	}
	
	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='min-w-[700px] min-h-[700px] p-0'>
				<div className='flex w-full'>
					<div className='w-[40%]'>
						<img className='rounded-l-md h-full object-cover' src={authImage} alt={stormicName} />
						<img className='absolute left-2 top-2 rounded-full' src={logoImage} alt={stormicName} height='54' width='54' />
					</div>
					<div className='w-[60%] flex h-full items-center justify-center'>
						<div className='w-full px-20'>
							{type === 'login' && <LoginForm onClose={handleClose}  setType={setType}/>}
							{type === 'register' && <RegisterForm onClose={handleClose}  setType={setType}/>}
							{type === 'email' && <EmailForm onClose={handleClose}  setType={setType}/>}
							{/* <Button */}
							{/* 	variant='blue' */}
							{/* 	onClick={onSwitchType} */}
							{/* 	type='button' */}
							{/* 	className='flex items-center text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white' */}
							{/* > */}
							{/* 	{type !== 'login' ? formatMessage({ id: 'loginForm.loginButton' }) : formatMessage({ id: 'registerForm.regButton' })} */}
							{/* </Button> */}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
