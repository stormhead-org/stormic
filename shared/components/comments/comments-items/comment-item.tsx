import { CommentBody } from '@/shared/components/comments/comments-items/comment-body'
import { CommentHeader } from '@/shared/components/comments/comments-items/comment-header'
import { cn } from '@/shared/lib/utils'
import React from 'react'

export interface CommentItemProps {
	endAdornment?: React.ReactNode
	postTitle?: string | null
	content: string
	postUrl?: string
	authorName: string
	authorUrl: string
	authorAvatar?: string | null
	publicationDate?: string
	maxLengthHeader?: number
	maxLengthBody?: number
	className?: string
}

export const CommentItem: React.FC<CommentItemProps> = ({
	                                                        endAdornment,
	                                                        postTitle,
	                                                        content,
	                                                        postUrl,
	                                                        authorName,
	                                                        authorUrl,
	                                                        authorAvatar,
	                                                        publicationDate,
	                                                        maxLengthHeader,
	                                                        maxLengthBody,
	                                                        className
                                                        }) => {
	return (
		<div className={cn('rounded-md p-2 w-full', className)}>
			<CommentHeader authorAvatar={String(authorAvatar)} authorUrl={authorUrl} authorName={authorName}
			               postTitle={String(postTitle)} maxLength={maxLengthHeader} publicationDate={publicationDate}
			               postUrl={postUrl} />
			<CommentBody content={content} maxLength={maxLengthBody} postUrl={postUrl} />
			{endAdornment}
		</div>
	)
}
