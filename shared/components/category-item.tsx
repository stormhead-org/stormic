import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'

export interface CategoryItemProps {
	text: string
	value: string
	endAdornment?: React.ReactNode
	name?: string
	url?: string
	image?: string
	className?: string
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
	text,
	value,
	endAdornment,
	name,
	image,
	url,
	className
  }) => {
	return (
		<div className={cn('', className)}>
		<Link href={String(url)}>
		<div className='flex items-center space-x-2 h-12'>
			
			<img className='w-8 h-8 rounded-full ml-2' src={image} alt={name} />
			<label
				htmlFor={`checkbox-${String(name)}-${String(value)}`}
				className='leading-none cursor-pointer flex-1'
			>
				{text}
			</label>
			
			{endAdornment}
		</div>
		</Link>
		</div>
	)
}
