'use client'

import { CommentFeedForm } from '@/shared/components/comment-feed-item/comment-feed-form'
import { useComments } from '@/shared/hooks/use-comments'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	className?: string
}

export const CommentFeedGroup: React.FC<Props> = ({ className }) => {
	
	const { comments, loading } = useComments()
	
	const items = comments.map(item => ({
		postTitle: item.post.title,
		postContent: item.content,
		postUrl: '/p/' + item.post_id,
		authorName: item.author.fullName,
		authorUrl: '/u/' + item.author_id,
		authorAvatar: item.author.profile_picture
	}))
	
	return (
		<div className={cn('', className)}>
			<CommentFeedForm
				limit={10}
				items={items}
				loading={loading}
				className='mt-4'
			/>
		</div>
	)
}
