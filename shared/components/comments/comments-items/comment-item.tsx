import { CommentBody } from '@/shared/components/comments/comments-items/comment-body'
import { CommentHeader } from '@/shared/components/comments/comments-items/comment-header'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface CommentItemProps {
	postTitle: string
	content: string
	postId?: number
	authorName: string
	authorId: number
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
			<CommentHeader authorAvatar={String(authorAvatar)} authorUrl={`u/${authorId}`} authorName={authorName}
			               postTitle={String(postTitle)} maxLength={maxLengthHeader} publicationDate={publicationDate}
			               postUrl={`p/${postId}`} />
			<CommentBody content={content} maxLength={maxLengthBody} postUrl={`p/${postId}`} fileUrl={fileUrl}
			             deleted={deleted} />
		</div>
	)
}
