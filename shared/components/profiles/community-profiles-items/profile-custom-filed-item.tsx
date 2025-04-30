'use client'

import { cn } from '@/shared/lib/utils'
import { truncateText } from '@/shared/utils/textUtils'
import Link from 'next/link'
import React from 'react'

interface Props {
	fieldsKey: string
	fieldsValue: string
	loading?: boolean
	className?: string
}

export const ProfileCustomFieldItem: React.FC<Props> = ({
	fieldsKey,
	fieldsValue,
	loading,
	className
}) => {
	const truncatedContent = truncateText(fieldsValue, 54)

	return (
		<div className={cn('', className)}>
			<p className='mt-2 text-medium pt-2 border-t-secondary border-t-2'>
				{fieldsKey}
			</p>
			<Link className='mt-1' target='_blank' href={truncatedContent}>
				{truncatedContent}
			</Link>
		</div>
	)
}
