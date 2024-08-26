'use client'

import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'

interface Props {
	fieldsKey: string
	fieldsValue: string
	loading?: boolean
	className?: string
}

const truncateText = (text: string, maxLength: number | undefined) => {
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
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
			<p className='text-md font-bold mt-2 pt-2 border-t-secondary border-t-2'>
				{fieldsKey}
			</p>
			<Link className='text-md mt-1 text-a-color hover:text-a-color-hover'
			      href={truncatedContent}>{truncatedContent}</Link>
		</div>
	)
}
