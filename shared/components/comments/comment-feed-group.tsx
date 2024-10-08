'use client'

import { Title } from '@/shared/components'
import { CommentForm } from '@/shared/components/comments/comments-items/comment-form'
import { useComments } from '@/shared/hooks/use-comments'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	className?: string
}

export const CommentFeedGroup: React.FC<Props> = ({ className }) => {
	const { formatMessage } = useIntl()
	const { comments, loading } = useComments()
	
	const items = comments.map((item: any) => ({
		postTitle: item.post_title,
		content: item.content,
		postUrl: '/p/' + item.post_id,
		authorName: item.author_fullName,
		authorUrl: '/u/' + item.author_id,
		deleted: item.deleted,
		fileUrl: item.fileUrl,
		authorAvatar: item.author_profile_picture
	}))
	
	return (
		<div className={cn('', className)}>
			<Title
				text={formatMessage({ id: 'commentFeedGroup.discussingTitle' })}
				size='sm'
				className='font-bold flex items-center w-full h-12 pl-3 border-l-2 border-l-blue-700'
			/>
			<div className='flex flex-col h-[87vh] overflow-auto no-scrollbar'>
				<CommentForm
					limit={10}
					items={items}
					loading={loading}
					className='mt-4'
					maxLengthHeader={28}
					maxLengthBody={56}
				/>
			</div>
		</div>
	)
}
