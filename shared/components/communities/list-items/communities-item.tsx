'use client'

import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export interface CategoryItemProps {
	text: string
	// value: string
	name?: string
	url?: string
	image?: string
	className?: string
}

export const CommunitiesItem: React.FC<CategoryItemProps> = ({
	text,
	// value,
	name,
	url,
	image,
	className,
}) => {
	const pathname = usePathname()

	return (
		<div className={cn('', className)}>
			<Link href={String(url)}>
				<div
					className={cn(
						'flex items-center justify-between w-full h-12 rounded-[6px] hover:bg-blue-700 hover:text-white cursor-pointer mb-1 space-x-2',
						`${
							pathname === url ? 'bg-blue-800 text-white hover:bg-blue-800' : ''
						}`
					)}
				>
					<img className='w-8 h-8 rounded-full ml-2' src={image} alt={name} />
					<label
						// htmlFor={`checkbox-${String(name)}-${String(value)}`}
						className='leading-none cursor-pointer flex-1'
					>
						{text}
					</label>
				</div>
			</Link>
		</div>
	)
}
