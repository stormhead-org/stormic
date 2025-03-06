'use client'

import type { UserProfile } from '@/app/actions'
import { FormInput } from '@/shared/components/form'
import { Skeleton } from '@/shared/components/ui/skeleton'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
	userId: number
	profile: UserProfile | null
	onCustomFieldChange: (id: number, key: string, value: string) => void
	loading: boolean
}

export const SettingsPageProfileCustomFieldsItem: React.FC<Props> = ({
	                                                                     profile,
	                                                                     onCustomFieldChange,
	                                                                     loading
                                                                     }) => {
	const { register, setValue, watch } = useFormContext()
	
	if (loading) return (
		<div className='gap-6 mt-4'>
			<Skeleton className='h-6 mb-4 rounded-[8px]' />
			<Skeleton className='h-6 mb-4 rounded-[8px]' />
		</div>
	)
	
	if (!profile) return <div>No profile data available</div>
	
	
	return (
		<>
			{profile.customFields.map((field, index) => (
				<div key={field.id} className='flex gap-2 w-full items-center mt-2'>
					<FormInput
						className='w-1/2'
						type='text'
						{...register(`customFields.${index}.key`, {
							value: field.key
						})}
						placeholder='Заголовок'
						onChange={(e) => {
							const newKey = e.target.value
							setValue(`customFields.${index}.key`, newKey)
							onCustomFieldChange(field.id, newKey, field.value)
						}}
					/>
					<FormInput
						className='w-1/2'
						type='text'
						{...register(`customFields.${index}.value`, {
							value: field.value
						})}
						placeholder='Значение'
						onChange={(e) => {
							const newValue = e.target.value
							setValue(`customFields.${index}.value`, newValue)
							onCustomFieldChange(field.id, field.key, newValue)
						}}
					/>
				</div>
			))}
		</>
	)
}
