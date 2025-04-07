import { CommentBody } from '@/shared/components/comments/comments-items/comment-body'
import { CommentHeader } from '@/shared/components/comments/comments-items/comment-header'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface CommentItemProps {
	postTitle: string
	content: string
	postId?: string
	authorName: string
	authorId: string
	authorAvatar?: string | null
	publicationDate?: string
	maxLengthHeader?: number
	maxLengthBody?: number
	fileUrl: string | null
	deleted: boolean
	className?: string
}

export const CommentItem: React.FC<CommentItemProps> = ({
	postTitle,
	content,
	postId,
	authorName,
	authorId,
	authorAvatar,
	publicationDate,
	maxLengthHeader,
	maxLengthBody,
	fileUrl,
	deleted,
	className
}) => {
	return (
		<div className={cn('rounded-md p-2 w-full', className)}>
			<CommentHeader
				authorAvatar={authorAvatar || ''}
				authorUrl={`/u/${authorId}`}
				authorName={authorName}
				postTitle={postTitle}
				maxLength={maxLengthHeader}
				publicationDate={publicationDate}
				postUrl={postId ? `/p/${postId}` : '#'}
			/>
			<CommentBody
				content={content}
				maxLength={maxLengthBody}
				postUrl={postId ? `/p/${postId}` : '#'}
				fileUrl={fileUrl}
				deleted={deleted}
			/>
		</div>
	)
}
