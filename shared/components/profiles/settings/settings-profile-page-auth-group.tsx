'use client'

import { checkCurrentPassword, updateUserInfo } from '@/app/actions'
import { Container, Title } from '@/shared/components'
import { FormInput } from '@/shared/components/form'
import {
	formAccountUpdateSchema,
	formNewPasswordUpdateSchema,
	TFormAccountUpdateValues,
	TFormNewPasswordUpdateValues
} from '@/shared/components/modals/auth-modal/forms/schemas'
import { Button } from '@/shared/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@prisma/client'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
	data: User
}

export const SettingsProfilePageAuthGroup: React.FC<Props> = ({ data }) => {
	const formAccountUpdate = useForm<TFormAccountUpdateValues>({
		resolver: zodResolver(formAccountUpdateSchema),
		defaultValues: {
			email: data.email,
			currentPassword: ''
		}
	})
	
	const formPasswordUpdate = useForm<TFormNewPasswordUpdateValues>({
		resolver: zodResolver(formNewPasswordUpdateSchema),
		defaultValues: {
			password: '',
			confirmPassword: ''
		}
	})
	
	const onSubmit = async () => {
		const emailData = formAccountUpdate.getValues('email')
		const currentPasswordData = formAccountUpdate.getValues('currentPassword') || '' // Гарантируем, что это строка
		const passwordData = formPasswordUpdate.getValues('password')
		const confirmPasswordData = formPasswordUpdate.getValues('confirmPassword')
		
		// Динамическая валидация в зависимости от заполненных полей
		let isAccountValid = true
		let isPasswordValid = true
		
		if (emailData) {
			isAccountValid = await formAccountUpdate.trigger(['email', 'currentPassword'])
		}
		
		if (passwordData || confirmPasswordData) {
			isPasswordValid = await formPasswordUpdate.trigger(['password', 'confirmPassword'])
			isAccountValid = isAccountValid && await formAccountUpdate.trigger('currentPassword')
			
			// Проверяем совпадение паролей
			if (passwordData !== confirmPasswordData) {
				toast.error('Новый пароль и подтверждение пароля не совпадают', {
					icon: '❌'
				})
				return
			}
		}
		
		if (!isAccountValid || !isPasswordValid) {
			toast.error('Пожалуйста, заполните все необходимые поля корректно', {
				icon: '❌'
			})
			return
		}
		
		// Проверяем текущий пароль перед обновлением данных
		const isCurrentPasswordValid = await checkCurrentPassword(data.id, currentPasswordData)
		if (!isCurrentPasswordValid) {
			toast.error('Неверный текущий пароль', {
				icon: '❌'
			})
			return
		}
		
		// Формирование данных для обновления
		const accountData = formAccountUpdate.getValues()
		
		try {
			await updateUserInfo({
				where: { id: data.id },
				data: {
					email: accountData.email,
					password: passwordData || undefined
				}
			})
			
			toast.success('Данные обновлены 📝', {
				icon: '✅'
			})
			
			formPasswordUpdate.reset({
				password: '',
				confirmPassword: ''
			})
			formAccountUpdate.reset({
				currentPassword: ''
			})
		} catch (error) {
			toast.error('Ошибка при обновлении данных', {
				icon: '❌'
			})
		}
	}
	
	return (
		<Container className='bg-secondary rounded-md mt-1 p-4'>
			<Title text='Безопасность' size='sm' />
			
			<FormProvider {...formAccountUpdate}>
				<form className='mt-2'>
					<div className='flex items-center gap-4'>
						<FormInput
							className='w-full'
							type='email'
							name='email'
							label='E-Mail'
							required
						/>
						<FormInput
							className='w-full'
							type='password'
							name='currentPassword'
							label='Текущий пароль'
							placeholder='********'
							required
						/>
					</div>
				</form>
			</FormProvider>
			
			<FormProvider {...formPasswordUpdate}>
				<form className='mt-2'>
					<div className='flex items-center gap-4'>
						<FormInput
							className='w-full'
							type='password'
							name='password'
							label='Новый пароль'
							placeholder='Введите новый пароль'
						/>
						<FormInput
							className='w-full'
							type='password'
							name='confirmPassword'
							label='Подтвердрите пароль'
							placeholder='Введите новый пароль еще раз'
						/>
					</div>
				</form>
			</FormProvider>
			
			<Button
				disabled={formAccountUpdate.formState.isSubmitting || formPasswordUpdate.formState.isSubmitting}
				variant='blue'
				className='text-base mt-6 w-full'
				onClick={onSubmit}
			>
				Сохранить
			</Button>
		</Container>
	)
}
