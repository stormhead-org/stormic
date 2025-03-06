'use client'

import { User } from '@/payload-types'
import { Container, Title } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	data: User
}

export const SettingsProfilePageAuthGroup: React.FC<Props> = ({ data }) => {
	// const { formatMessage } = useIntl()

	// const formAccountUpdate = useForm<TFormAccountUpdateValues>({
	// 	resolver: zodResolver(formAccountUpdateSchema),
	// 	defaultValues: {
	// 		email: data.email,
	// 		password: ''
	// 	}
	// })

	// const formPasswordUpdate = useForm<TFormNewPasswordUpdateValues>({
	// 	resolver: zodResolver(formNewPasswordUpdateSchema),
	// 	defaultValues: {
	// 		newPassword: '',
	// 		confirmPassword: ''
	// 	}
	// })

	// const onSubmit = async () => {
	// 	const emailData = formAccountUpdate.getValues('email')
	// 	const passwordData = formAccountUpdate.getValues('password') || '' // Гарантируем, что это строка
	// 	const newPasswordData = formPasswordUpdate.getValues('newPassword')
	// 	const confirmPasswordData = formPasswordUpdate.getValues('confirmPassword')

	// 	// Динамическая валидация в зависимости от заполненных полей
	// 	let isAccountValid = true
	// 	let isPasswordValid = true

	// 	// Проверка email, если доступно изменение
	// 	if (data.passwordChange && emailData) {
	// 		isAccountValid = await formAccountUpdate.trigger(['email', 'password'])

	// 		// Проверка текущего пароля для изменения email
	// 		const isCurrentPasswordValid = await checkCurrentPassword(data.id, passwordData)
	// 		if (!isCurrentPasswordValid) {
	// 			toast.error(String(formatMessage({ id: 'profilePageAuthGroup.toastWrongPassword' })), {
	// 				icon: '❌'
	// 			})
	// 			return
	// 		}
	// 	}

	// 	if (newPasswordData || confirmPasswordData) {
	// 		isPasswordValid = await formPasswordUpdate.trigger(['newPassword', 'confirmPassword'])

	// 		// Проверяем совпадение паролей
	// 		if (newPasswordData !== confirmPasswordData) {
	// 			toast.error(String(formatMessage({ id: 'profilePageAuthGroup.toastPasswordsNotMatch' })), {
	// 				icon: '❌'
	// 			})
	// 			return
	// 		}

	// 		// Проверяем текущий пароль только если passwordChange === true и новое поле email пустое
	// 		if (data.passwordChange && !emailData) {
	// 			const isPasswordFieldValid = await formAccountUpdate.trigger('password')
	// 			if (!isPasswordFieldValid) {
	// 				isAccountValid = false
	// 			}

	// 			const isCurrentPasswordValid = await checkCurrentPassword(data.id, passwordData)
	// 			if (!isCurrentPasswordValid) {
	// 				toast.error(String(formatMessage({ id: 'profilePageAuthGroup.toastWrongPassword' })), {
	// 					icon: '❌'
	// 				})
	// 				return
	// 			}
	// 		}
	// 	}

	// 	// Проверяем общую валидность формы
	// 	if (!isAccountValid || !isPasswordValid) {
	// 		toast.error(String(formatMessage({ id: 'profilePageAuthGroup.toastFillAllFields' })), {
	// 			icon: '❌'
	// 		})
	// 		return
	// 	}

	// 	// Формирование данных для обновления
	// 	const accountData = formAccountUpdate.getValues()

	// 	try {
	// 		await updateUserInfo({
	// 			where: { id: data.id },
	// 			data: {
	// 				email: data.passwordChange ? accountData.email : undefined,
	// 				password: newPasswordData || undefined,
	// 				passwordChange: true // После успешной смены пароля устанавливаем passwordChange в true
	// 			}
	// 		})

	// 		toast.success(String(formatMessage({ id: 'profilePageAuthGroup.toastSuccess' })), {
	// 			icon: '✅'
	// 		})

	// 		formPasswordUpdate.reset({
	// 			newPassword: '',
	// 			confirmPassword: ''
	// 		})
	// 		formAccountUpdate.reset({
	// 			password: ''
	// 		})
	// 	} catch (error) {
	// 		toast.error(String(formatMessage({ id: 'profilePageAuthGroup.toastError' })), {
	// 			icon: '❌'
	// 		})
	// 	}
	// }

	return (
		<Container className='bg-secondary rounded-md mt-1 p-4'>
			{/* {!data.passwordChange &&
				<p
					className='text-notification-color-red'>{formatMessage({ id: 'profilePageAuthGroup.socialAccountPasswordChange' })}</p>
			} */}
			<div className='w-full border-b-2 border-b-blue-600 pb-4'>
				<Title
					// text={formatMessage({ id: 'profilePageAuthGroup.titleSecurity' })}
					text='Безопасность'
					size='sm'
					className='mt-2'
				/>
			</div>
			<div
			//  {...formAccountUpdate}
			>
				<form className='mt-4'>
					<div className='flex items-center gap-4 w-full'>
						<div className='w-full mt-2'>
							<p>
								{/* {formatMessage({ id: 'profilePageAuthGroup.titleEmail' })} */}
								Почта
							</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								{/* {formatMessage({ id: 'profilePageAuthGroup.descriptionEmail' })} */}
								Вы можете изменить свой почтовый адрес
							</p>
							{/* <FormInput
								className='mt-2 w-full'
								type='email'
								name='email'
								// disabled={!data.passwordChange} // Отключаем инпут, если passwordChange === false
								placeholder='user@stormic.app'
							/> */}
						</div>
						<div className='w-full mt-2'>
							<p>
								{/* {formatMessage({ id: 'profilePageAuthGroup.titlePassword' })} */}
								Пароль
							</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								{/* {formatMessage({ id: 'profilePageAuthGroup.descriptionPassword' })} */}
								Требуется для подтверждения изменений
							</p>
							{/* <FormInput
								className='mt-2 w-full'
								type='password'
								name='password'
								// disabled={!data.passwordChange} // Отключаем инпут, если passwordChange === false
								placeholder='********'
							/> */}
						</div>
					</div>
				</form>
			</div>

			<div
			//  {...formPasswordUpdate}
			>
				<form className='mt-2'>
					<div className='flex items-center gap-4 w-full'>
						<div className='w-full mt-2'>
							<p>
								{/* {formatMessage({ id: 'profilePageAuthGroup.titleNewPassword' })} */}
								Новый пароль
							</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								{/* {formatMessage({ id: 'profilePageAuthGroup.descriptionNewPassword' })} */}
								Введите желаемый пароль
							</p>
							{/* <FormInput
								className='mt-2 w-full'
								type='password'
								name='newPassword'
								// placeholder={formatMessage({ id: 'profilePageAuthGroup.formInputNewPassPlaceholder' })}
								placeholder='Введите новый пароль'
							/> */}
						</div>
						<div className='w-full mt-2'>
							<p>
								{/* {formatMessage({ id: 'profilePageAuthGroup.titleConfirmPassword' })} */}
								Подтвердите пароль
							</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								{/* {formatMessage({ id: 'profilePageAuthGroup.descriptionConfirmPassword' })} */}
								Введите повторно новый пароль для избежания опечаток
							</p>
							{/* <FormInput
								className='mt-2 w-full'
								type='password'
								name='confirmPassword'
								// placeholder={formatMessage({ id: 'profilePageAuthGroup.formInputConfirmPassPlaceholder' })}
								placeholder='Введите новый пароль еще раз'
							/> */}
						</div>
					</div>
				</form>
			</div>

			<Button
				// disabled={formAccountUpdate.formState.isSubmitting || formPasswordUpdate.formState.isSubmitting}
				variant='blue'
				className='text-base mt-6 w-full'
				// onClick={onSubmit}
			>
				{/* {formatMessage({ id: 'profilePageAuthGroup.saveButton' })} */}
				Сохранить
			</Button>
		</Container>
	)
}
