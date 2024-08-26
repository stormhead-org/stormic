'use client'

import { FormTextarea } from '@/shared/components/form'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { cn } from '@/shared/lib/utils'
import { ListFilter } from 'lucide-react'
import React from 'react'

interface Props {
	loading?: boolean
	commentsHeader: string
	className?: string
}

export const CommentInputForm: React.FC<Props> = ({ loading, commentsHeader, className }) => {
	
	if (loading) {
		return (
			<div className={className}>
				<Skeleton className='h-6 mb-4 rounded-[8px]' />
			</div>
		)
	}
	
	return (
		<div className={cn('', className)}>
			<div className='flex justify-between items-center'>
				{commentsHeader ? (
					<p className='pl-1 text-lg cursor-default'>
						{commentsHeader} комментария
					</p>
				) : (
					<p className='pl-1 text-lg cursor-default'>
						Тут пока никого нет...
					</p>
				)}
				<div className='group'>
					<p className='flex items-center group-hover:text-blue-600 font-bold'>
						<ListFilter className='group-hover:bg-blue-600/20 rounded-full ml-2 w-7 h-7 p-1 cursor-pointer' />
					</p>
				</div>
			</div>
			
			<FormTextarea
				name='comment'
				className='text-base mt-2'
				placeholder='Комментарий...'
				rows={5}
				sideButton={true}
			/>
		</div>
	)
}
