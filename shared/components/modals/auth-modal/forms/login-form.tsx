import { Button } from '@/shared/components/ui/button'
import { Github, Mail } from 'lucide-react'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	onClose?: VoidFunction
	setType: React.Dispatch<
		React.SetStateAction<'login' | 'email' | 'register' | 'passwordReset'>
	>
}

export const LoginForm: React.FC<Props> = ({ setType, onClose }) => {
	// const { formatMessage } = useIntl()

	return (
		<div className='flex flex-col gap-4'>
			<p className='text-xl font-bold text-center '>Авторизация</p>

			<Button
				variant='ghost'
				// onClick={() =>
				// 	signIn('google', {
				// 		callbackUrl: '/',
				// 		redirect: true
				// 	})
				// }
				type='button'
				className='flex w-full items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
			>
				<img className='w-6 h-6' src='/google24px.svg' alt='Google' />
				Google
			</Button>

			<Button
				variant='ghost'
				// onClick={() =>
				// 	signIn('github', {
				// 		callbackUrl: '/',
				// 		redirect: true
				// 	})
				// }
				type='button'
				className='flex w-full items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
			>
				<Github size={24} />
				GitHub
			</Button>

			<Button
				variant='blue'
				onClick={() => setType('email')}
				type='button'
				className='flex w-full items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
			>
				<Mail size={24} />
				Почта
			</Button>
		</div>
	)
}
