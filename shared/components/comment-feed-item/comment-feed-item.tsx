import { CommentFeedBody } from '@/shared/components/comment-feed-item/comment-feed-body'
import { CommentFeedHeader } from '@/shared/components/comment-feed-item/comment-feed-header'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'

export interface CommentItemProps {
	endAdornment?: React.ReactNode
	postTitle: string
	postContent: string
	postUrl: string
	authorName: string
	authorUrl: string
	authorAvatar?: string | null
	className?: string
}

export const CommentFeedItem: React.FC<CommentItemProps> = ({
	                                                            endAdornment,
	                                                            postTitle,
	                                                            postContent,
	                                                            postUrl,
	                                                            authorName,
	                                                            authorUrl,
	                                                            authorAvatar,
	                                                            className
                                                            }) => {
	return (
		<div className={cn('mb-4 bg-secondary/25 hover:bg-secondary/50 rounded-md p-2 w-full', className)}>
			<Link href={String(postUrl)}>
				<CommentFeedHeader authorAvatar={String(authorAvatar)} authorUrl={authorUrl} authorName={authorName}
				                   postTitle={postTitle} maxLength={28} />
				<CommentFeedBody postContent={postContent} maxLength={56} />
				{endAdornment}
			</Link>
		</div>
	)
}
