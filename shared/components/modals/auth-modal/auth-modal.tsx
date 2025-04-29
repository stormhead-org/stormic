'use client'

import { EmailForm } from '@/shared/components/modals/auth-modal/forms/email-form'
import { LoginForm } from '@/shared/components/modals/auth-modal/forms/login-form'
import { RegisterForm } from '@/shared/components/modals/auth-modal/forms/register-form'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	stormicName: string
	logoImage?: string
	authImage?: string
	open: boolean
	onClose: () => void
}

export const AuthModal: React.FC<Props> = ({
	stormicName,
	logoImage,
	authImage,
	open,
	onClose
}) => {
	// const { formatMessage } = useIntl()
	const [type, setType] = React.useState<
		'login' | 'email' | 'register' | 'passwordReset'
	>('login')

	const handleClose = () => {
		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='min-w-[43vw] h-[78vh] p-0'>
				<DialogHeader className='hidden'>
					<DialogTitle />
				</DialogHeader>
				<div className='flex w-full h-full'>
					<div className='w-2/5 h-full'>
						<img
							className='rounded-l-md h-full object-cover'
							src={authImage}
							alt={stormicName}
						/>
						<img
							className='absolute left-2 top-2 rounded-full'
							src={logoImage}
							alt={stormicName}
							height='54'
							width='54'
						/>
					</div>
					<div className='w-3/5 h-full'>
						<div className='w-full h-full'>
							{type === 'login' && (
								<LoginForm onClose={handleClose} setType={setType} />
							)}
							{type === 'email' && (
								<EmailForm onClose={handleClose} setType={setType} />
							)}
							{type === 'register' && (
								<RegisterForm onClose={handleClose} setType={setType} />
							)}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
