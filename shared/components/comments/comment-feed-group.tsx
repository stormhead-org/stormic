'use client'

import { Title } from '@/shared/components'
import { CommentForm } from '@/shared/components/comments/comments-items/comment-form'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const CommentFeedGroup: React.FC<Props> = ({ className }) => {
	const { formatMessage } = useIntl()
	
	return (
		<div className={cn('', className)}>
			<Title
				text={formatMessage({ id: 'commentFeedGroup.discussingTitle' })}
				size='sm'
				className='font-bold flex items-center w-full h-12 pl-3 border-l-2 border-l-blue-700'
			/>
			<div className='flex flex-col h-[87vh] overflow-auto no-scrollbar rounded-md'>
				<CommentForm
					className='mt-4'
					maxLengthHeader={28}
					maxLengthBody={56}
					apiUrl='/api/comments'
					paramKey='global'
					paramValue={String('true')}
				/>
			</div>
		</div>
	)
}
