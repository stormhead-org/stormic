'use client'

import { updateUserInfo } from '@/app/actions'
import { Container, Title } from '@/shared/components'
import { FormInput, FormTextarea } from '@/shared/components/form'
import type { TFormProfileUpdateValues } from '@/shared/components/modals/auth-modal/forms/schemas'
import {
	SettingsPageProfileCustomFieldsItem
} from '@/shared/components/profiles/settings/settings-page-items/settings-page-profile-custom-fields-item'
import { Button } from '@/shared/components/ui/button'
import { useProfileCustomFields, useProfileCustomFieldsForm } from '@/shared/hooks'
import { User } from '@prisma/client'
import React, { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
	data: User;
}

export const SettingsProfilePageGroup: React.FC<Props> = ({ data }) => {
	const { profile, loading, updateCustomField } = useProfileCustomFields(data.id)
	const form = useProfileCustomFieldsForm(data, profile) // Передаем оба аргумента
	
	const { setValue, handleSubmit, formState } = form
	
	useEffect(() => {
		if (profile) {
			setValue('fullName', profile.fullName)
			setValue('bio', profile.bio ?? '')
			setValue('customFields', profile.customFields)
		}
	}, [profile, setValue])
	
	const onSubmit = async (formData: TFormProfileUpdateValues) => {
		if (!profile) return
		
		try {
			await updateUserInfo({
				where: { id: profile.id },
				data: {
					fullName: formData.fullName,
					bio: formData.bio,
					customFields: formData.customFields // Используем значения из формы
				}
			})
			
			toast.success('Данные обновлены 📝', {
				icon: '✅'
			})
		} catch (error) {
			toast.error('Ошибка при обновлении данных', {
				icon: '❌'
			})
		}
	}
	
	return (
		<Container className='bg-secondary rounded-md mt-1 p-4'>
			<p>
				Настройте то, что люди видят в вашем профиле. Другие люди с большей вероятностью подпишутся на Вас и будут
				взаимодействовать с вами, если у Вас заполнен профиль и добавлено изображение.
			</p>
			<div className='w-full border-b-2 border-b-blue-600 pb-4'>
				<Title text='Основная информация' size='sm' className='mt-2' />
			</div>
			<FormProvider {...form}>
				<form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
					<div className='flex gap-4 w-full'>
						<div className='w-1/2'>
							<p className='mt-2'>Отображаемое имя</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								Ваше полное имя или псевдоним.
							</p>
							<FormInput name='fullName' className='mt-2' />
							<p className='mt-4'>О себе</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								Расскажите миру немного о себе
							</p>
							<FormTextarea
								name='bio'
								placeholder='Я бы много вам о себе рассказал, просто не хочу...'
								className='mt-2'
								sideButton={false}
							/>
						</div>
						<div className='w-1/2'>
							<p className='mt-2'>Таблица деталей</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								Ваша домашняя страница, возраст - все, что угодно.
							</p>
							<SettingsPageProfileCustomFieldsItem
								userId={data.id}
								profile={profile}
								onCustomFieldChange={updateCustomField}
								loading={loading}
							/>
						</div>
					</div>
					<Button
						disabled={formState.isSubmitting}
						className='text-base mt-6 w-full'
						variant='blue'
						type='submit'
					>
						Сохранить
					</Button>
				</form>
			</FormProvider>
		</Container>
	)
}
