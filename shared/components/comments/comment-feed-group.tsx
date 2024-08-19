'use client'

import { CommentForm } from '@/shared/components/comments/comments-items/comment-form'
import { useComments } from '@/shared/hooks/use-comments'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	className?: string
}

export const CommentFeedGroup: React.FC<Props> = ({ className }) => {
	
	const { comments, loading } = useComments()
	
	const items = comments.map((item: any) => ({
		postTitle: item.post_title,
		content: item.content,
		postUrl: '/p/' + item.post_id,
		authorName: item.author_fullName,
		authorUrl: '/u/' + item.author_id,
		authorAvatar: item.author_profile_picture
	}))
	
	return (
		<div className={cn('', className)}>
			<CommentForm
				limit={10}
				items={items}
				loading={loading}
				className='mt-4'
				maxLengthHeader={28}
				maxLengthBody={56}
			/>
		</div>
	)
}
