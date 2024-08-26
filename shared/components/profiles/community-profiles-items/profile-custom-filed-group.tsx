'use client'

import { ProfileCustomField } from '@/shared/components/profiles/community-profiles-items/profile-custom-filed-form'
import { useUserById } from '@/shared/hooks/use-user-by-id'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	userId: string
	className?: string
}

export const ProfileCustomFieldForm: React.FC<Props> = ({ userId, className }) => {
	const { user, loading } = useUserById(userId)
	
	// Проверяем наличие пользователя и его customFields
	const items = user?.customFields.map((field) => ({
		fieldsKey: field.key,
		fieldsValue: field.value
	})) || []
	
	// Проверка на наличие хотя бы одного непустого ключа
	const hasNonEmptyField = user?.customFields.some(field => field.key.trim().length > 0 || field.value.trim().length > 0)
	
	return (
		<div className={cn('', className)}>
			{hasNonEmptyField && <ProfileCustomField items={items} loading={loading} />}
		</div>
	)
}
