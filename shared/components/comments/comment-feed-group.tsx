'use client'

import { Title } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { CommentForm } from './comments-items/comment-form'

// import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const CommentFeedGroup: React.FC<Props> = ({ className }) => {
	// const { formatMessage } = useIntl()

	return (
		<div className={cn('-mt-4', className)}>
			<div className='flex justify-between items-center'>
				<Title
					// text={formatMessage({ id: 'commentFeedGroup.discussingTitle' })}
					text='Сейчас обсуждают'
					size='sm'
					className='font-bold flex items-center w-full h-12 pl-3 border-l-2 border-theme rounded-xl'
				/>
				{/* <div className='mt-2'> */}
				{/* 	<SocketIndicator /> */}
				{/* </div> */}
			</div>

			<div className='flex flex-col rounded-md'>
				<CommentForm
					maxLengthHeader={28}
					maxLengthBody={56}
					apiUrl='/api/comments'
					paramKey='global'
					paramValue='true'
				/>
			</div>
		</div>
	)
}
