'use client'

// import { registerUser } from '@/app/actions'
import { FormInput } from '@/shared/components/form/'
import { Button } from '@/shared/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import { useIntl } from 'react-intl'
import { registerUser } from '@/shared/utils/registerUser'
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
			toast.success('Регистрация успешна. Подтвердите свою почту', {
				icon: '✅'
			})

			onClose?.()
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
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<p className='text-xl font-bold text-center'>Регистрация</p>
				<FormInput
					name='email'
					// label={formatMessage({ id: 'registerForm.formInputEmailLabel' })}
					label='Почта'
					placeholder='user@stormic.app'
					required
				/>
				<FormInput
					name='fullName'
					// label={formatMessage({ id: 'registerForm.formInputNameLabel' })}
					label='Имя'
					placeholder='Stormhead'
					required
				/>
				<FormInput
					name='password'
					// label={formatMessage({ id: 'registerForm.formInputPassLabel' })}
					label='Пароль'
					type='password'
					placeholder='********'
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
					required
				/>

				<Button
					variant='blue'
					loading={form.formState.isSubmitting}
					className='flex items-center gap-2 text-sm font-bold bg-secondary hover:bg-blue-700 text-primary hover:text-white'
					type='submit'
				>
					{/* {formatMessage({ id: 'registerForm.regButton' })} */}
					Зарегистрироваться
				</Button>
				<p className='text-gray-400 text-center'>
					Уже есть аккаунт?{' '}
					<span
						className='text-a-color hover:text-a-color-hover cursor-pointer'
						onClick={() => setType('login')}
					>
						Войти
					</span>
				</p>
			</form>
		</FormProvider>
	)
}
