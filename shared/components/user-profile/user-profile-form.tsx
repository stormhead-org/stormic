'use client'

import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	userId: number
	userName: string
	userEmail: string
	className?: string
}

export const UserProfileForm: React.FC<Props> = ({
	                                                 userId,
	                                                 userName,
	                                                 userEmail,
	                                                 className
                                                 }) => {
	
	return (
		<div className={cn('bg-secondary', className)}>
		
		</div>
	)
}
