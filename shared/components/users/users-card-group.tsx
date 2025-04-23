'use client'

import { User } from '@/payload-types'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { UsersCardForm } from './card-items/users-card-form'

interface Props {
	data: User[]
	loading?: boolean
	className?: string
}

export const UsersCardGroup: React.FC<Props> = ({
	data,
	loading,
	className
}) => {
	return (
		<div className={cn('', className)}>
			<UsersCardForm data={data} loading={loading} />
		</div>
	)
}
