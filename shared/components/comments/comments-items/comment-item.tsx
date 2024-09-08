import { CommentBody } from '@/shared/components/comments/comments-items/comment-body'
import { CommentHeader } from '@/shared/components/comments/comments-items/comment-header'
import { FullPostCommentFooter } from '@/shared/components/comments/full-post-comments-items/full-post-comment-footer'
import { cn } from '@/shared/lib/utils'
import React from 'react'

export interface CommentItemProps {
	endAdornment?: React.ReactNode
	hasPost?: boolean
	postTitle?: string | null
	content: string
	postUrl?: string
	authorName: string
	authorUrl: string
	authorAvatar?: string | null
	commentId?: number
	publicationDate?: string
	maxLengthHeader?: number
	maxLengthBody?: number
	className?: string
}

export const CommentItem: React.FC<CommentItemProps> = ({
	                                                        endAdornment,
	                                                        hasPost,
	                                                        postTitle,
	                                                        content,
	                                                        postUrl,
	                                                        authorName,
	                                                        authorUrl,
	                                                        authorAvatar,
	                                                        commentId,
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
			{hasPost && <FullPostCommentFooter
				commentId={Number(commentId)}
				className='mt-2'
			/>}
			{endAdornment}
		</div>
	)
}
