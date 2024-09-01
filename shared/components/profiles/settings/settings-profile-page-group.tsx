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
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

interface Props {
	data: User;
}

export const SettingsProfilePageGroup: React.FC<Props> = ({ data }) => {
	const { formatMessage } = useIntl()
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
			
			toast.success(String(formatMessage({ id: 'profilePageAuthGroup.toastSuccess' })), {
				icon: '✅'
			})
		} catch (error) {
			toast.error(String(formatMessage({ id: 'profilePageAuthGroup.toastError' })), {
				icon: '❌'
			})
		}
	}
	
	return (
		<Container className='bg-secondary rounded-md mt-1 p-4'>
			<p>
				{formatMessage({ id: 'profilePageEditGroup.tipForSocial' })}
			</p>
			<div className='w-full border-b-2 border-b-blue-600 pb-4'>
				<Title
					text={formatMessage({ id: 'profilePageEditGroup.titleBaseInfo' })}
					size='sm'
					className='mt-2'
				/>
			</div>
			<FormProvider {...form}>
				<form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
					<div className='flex gap-4 w-full'>
						<div className='w-1/2'>
							<p className='mt-2'>{formatMessage({ id: 'profilePageEditGroup.titleName' })}</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								{formatMessage({ id: 'profilePageEditGroup.descriptionName' })}
							</p>
							<FormInput name='fullName' className='mt-2' />
							<p className='mt-4'>{formatMessage({ id: 'profilePageEditGroup.titleAbout' })}</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								{formatMessage({ id: 'profilePageEditGroup.descriptionAbout' })}
							</p>
							<FormTextarea
								name='bio'
								placeholder={formatMessage({ id: 'profilePageEditGroup.formInputAboutPlaceholder' })}
								className='mt-2'
								sideButton={false}
							/>
						</div>
						<div className='w-1/2'>
							<p className='mt-2'>{formatMessage({ id: 'profilePageEditGroup.extraFields' })}</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								{formatMessage({ id: 'profilePageEditGroup.descriptionExtraFields' })}
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
						{formatMessage({ id: 'profilePageEditGroup.saveButton' })}
					</Button>
				</form>
			</FormProvider>
		</Container>
	)
}
