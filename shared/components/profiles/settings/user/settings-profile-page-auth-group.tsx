'use client'

import { User } from '@/payload-types'
import { Container, Title } from '@/shared/components'
import { FormInput } from '@/shared/components/form'
import { Button } from '@/shared/components/ui/button'
import { settingsUser } from '@/shared/utils/api/users/settingsUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
	formSettingsAccountUserSchema,
	TFormSettingsAccountUserValues
} from './forms/schemas'
// import { useIntl } from 'react-intl'

interface Props {
	user: User
}

export const SettingsProfilePageAuthGroup: React.FC<Props> = ({ user }) => {
	// const { formatMessage } = useIntl()

	const form = useForm<TFormSettingsAccountUserValues>({
		resolver: zodResolver(formSettingsAccountUserSchema),
		defaultValues: {
			email: user.email || ''
		}
	})
	const router = useRouter()

	const onSubmit = async (data: TFormSettingsAccountUserValues) => {
		try {
			await settingsUser({
				userId: user.id,
				email: data.email?.length ? data.email : ''
			})
			toast.success('Профиль обновлен', { icon: '✅' })
			router.refresh()
		} catch (error) {
			console.error('Error in onSubmit:', error)
			toast.error('Ошибка при обновлении профиля', { icon: '❌' })
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
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
						<div className='flex items-center gap-4 w-full mt-4'>
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
								<FormInput
									name='email'
									type='text'
									placeholder='stormic@stormhead.org'
									className='mt-2'
								/>
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
					</div>

					<div
					//  {...formPasswordUpdate}
					>
						<div className='flex items-center gap-4 w-full mt-2'>
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
					</div>

					<Button
						// disabled={formAccountUpdate.formState.isSubmitting || formPasswordUpdate.formState.isSubmitting}
						variant='blue'
						loading={form.formState.isSubmitting}
						className='text-base mt-6 w-full'
						type='submit'
						// onClick={onSubmit}
					>
						{/* {formatMessage({ id: 'profilePageAuthGroup.saveButton' })} */}
						Сохранить
					</Button>
				</Container>
			</form>
		</FormProvider>
	)
}
