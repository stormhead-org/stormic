'use client'

import { ProfileCustomField } from '@/shared/components/profiles/profile-items/profile-custom-filed-form'
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
	
	return (
		<div className={cn('', className)}>
			<ProfileCustomField items={items} loading={loading} />
		</div>
	)
}
