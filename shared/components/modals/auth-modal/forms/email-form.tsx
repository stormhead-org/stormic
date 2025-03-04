import { Title } from '@/shared/components'
import { FormInput } from '@/shared/components/form/'
import { Button } from '@/shared/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import { useIntl } from 'react-intl'
import { signIn } from '@/shared/utils/signIn'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { formLoginSchema, TFormLoginValues } from './schemas'

interface Props {
	onClose?: VoidFunction
	setType: React.Dispatch<
		React.SetStateAction<'login' | 'email' | 'register' | 'passwordReset'>
	>
}

export const EmailForm: React.FC<Props> = ({ setType, onClose }) => {
	const router = useRouter()
	// const { formatMessage } = useIntl()
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = useCallback(
		async (data: TFormLoginValues) => {
			try {
				const resp = await signIn(data)

				// toast.success(String(formatMessage({ id: 'loginForm.toastSuccess' })), {
				toast.success('Вы успешно вошли в аккаунт', {
					icon: '✅'
				})
				onClose?.()
				router.refresh()
			} catch (error) {
				console.error('Error [LOGIN]', error)

				// toast.error(String(formatMessage({ id: 'loginForm.toastError' })), {
				toast.error('Не удалось войти в аккаунт', {
					icon: '❌'
				})
			}
		},
		[router, onClose]
	)

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex justify-between items-center'>
					<div className='mr-2'>
						<Title
							// text={formatMessage({ id: 'loginForm.title' })}
							text='Вход в аккаунт'
							size='md'
							className='font-bold'
						/>
						{/* <p className='text-gray-400'> */}
						{/* 	{formatMessage({ id: 'loginForm.loginDescription' })} */}
						{/* </p> */}
					</div>
				</div>

				<FormInput
					name='email'
					// label={formatMessage({ id: 'loginForm.formInputEmailLabel' })}
					label='Почта'
					placeholder='user@stormic.app'
					required
				/>
				<FormInput
					name='password'
					// label={formatMessage({ id: 'loginForm.formInputPassLabel' })}
					label='Пароль'
					type='password'
					placeholder='********'
					required
				/>

				<Button
					variant='blue'
					loading={form.formState.isSubmitting}
					className='flex items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
					type='submit'
				>
					{/* {formatMessage({ id: 'loginForm.loginButton' })} */}
					Войти
				</Button>
				<p className='text-gray-400 text-center'>
					Нет аккаунта?{' '}
					<span
						className='text-a-color hover:text-a-color-hover cursor-pointer'
						onClick={() => setType('register')}
					>
						Создать
					</span>
				</p>
			</form>
		</FormProvider>
	)
}
