'use client'

import { CommentInputForm } from '@/shared/components/comments/comment-input-items/comment-input-form'
import { FullPostCommentForm } from '@/shared/components/comments/full-post-comments-items/full-post-comment-form'
import { usePostsComments } from '@/shared/hooks/use-post-comments'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	postId: string
	commentsHeader: string
	className?: string
}

export const CommentFullPostGroup: React.FC<Props> = ({
	                                                      postId,
	                                                      commentsHeader,
	                                                      className
                                                      }) => {
	
	const { comments, loading } = usePostsComments(postId)
	
	const items = comments.map(item => ({
		comment_id: item.comment_id,
		content: item.content,
		author_id: item.author_id,
		likesCount: item.likes_count,
		author: {
			fullName: item.author_fullName,
			profile_picture: item.author_profile_picture
		},
		publication_date: item.publication_date,
		children: item.children ? item.children.map(child => ({
			comment_id: child.comment_id,
			content: child.content,
			author_id: child.author_id,
			likesCount: child.likes_count,
			author: {
				fullName: child.author_fullName,
				profile_picture: child.author_profile_picture
			},
			publication_date: child.publication_date,
			children: [] // У дочерних комментариев children может быть пустым, если нет дальнейших вложений
		})) : []
	}))
	
	return (
		<div className={cn('bg-secondary rounded-md p-4 pb-8', className)}>
			<CommentInputForm commentsHeader={commentsHeader} loading={loading} />
			<FullPostCommentForm
				items={items}
				loading={loading}
				className=''
			/>
		</div>
	)
}
