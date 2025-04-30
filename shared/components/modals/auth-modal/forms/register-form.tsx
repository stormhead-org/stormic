'use client'

import { FormInput } from '@/shared/components/form/'
import { Button } from '@/shared/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import { useIntl } from 'react-intl'
import { Title } from '@/shared/components/title'
import { registerUser } from '@/shared/utils/api/users/registerUser'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { formRegisterSchema, TFormRegisterValues } from './schemas'

interface Props {
	onClose?: VoidFunction
	onClickLogin?: VoidFunction
	setType: React.Dispatch<
		React.SetStateAction<'login' | 'email' | 'register' | 'passwordReset'>
	>
}

export const RegisterForm: React.FC<Props> = ({
	setType,
	onClose,
	onClickLogin
}) => {
	// const { formatMessage } = useIntl()
	const router = useRouter()
	const form = useForm<TFormRegisterValues>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			confirmPassword: ''
		}
	})

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await registerUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
				confirmPassword: data.confirmPassword
			})

			// toast.success(String(formatMessage({ id: 'registerForm.toastSuccess' })), {
			toast.success('Регистрация успешна', {
				icon: '✅'
			})

			onClose?.()
			router.refresh()
		} catch (error) {
			// return toast.error(String(formatMessage({ id: 'registerForm.toastError' })), {
			return toast.error('Неверная почта или пароль', {
				icon: '❌'
			})
		}
	}

	return (
		<FormProvider {...form}>
			<form
				className='lg:h-[78vh] flex flex-col gap-4 px-10 overflow-auto pb-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<Title
					// text={formatMessage({ id: 'loginForm.title' })}
					text='Регистрация'
					size='md'
					className='font-bold text-foreground'
				/>

				<FormInput
					name='email'
					// label={formatMessage({ id: 'registerForm.formInputEmailLabel' })}
					label='Почта'
					placeholder='user@stormic.app'
					className='bg-secondary text-foreground rounded-xl'
					required
				/>
				<FormInput
					name='fullName'
					// label={formatMessage({ id: 'registerForm.formInputNameLabel' })}
					label='Имя'
					placeholder='Stormhead'
					className='bg-secondary text-foreground rounded-xl'
					required
				/>
				<FormInput
					name='password'
					// label={formatMessage({ id: 'registerForm.formInputPassLabel' })}
					label='Пароль'
					type='password'
					placeholder='********'
					className='bg-secondary text-foreground rounded-xl'
					required
				/>
				<FormInput
					name='confirmPassword'
					// label={formatMessage({
					// 	id: 'registerForm.formInputConfirmPassLabel'
					// })}
					label='Подтвердите пароль'
					type='password'
					placeholder='********'
					className='bg-secondary text-foreground rounded-xl'
					required
				/>

				<Button
					variant='blue'
					loading={form.formState.isSubmitting}
					className='flex items-center gap-2 text-sm font-bold bg-secondary hover:bg-theme text-foreground hover:text-background rounded-xl'
					type='submit'
				>
					{/* {formatMessage({ id: 'registerForm.regButton' })} */}
					Зарегистрироваться
				</Button>
				<p className='text-gray-400 text-center'>
					Уже есть аккаунт?{' '}
					<span
						className='text-theme cursor-pointer'
						onClick={() => setType('login')}
					>
						Войти
					</span>
				</p>
			</form>
		</FormProvider>
	)
}
