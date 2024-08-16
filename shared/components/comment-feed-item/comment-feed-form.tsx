'use client'

import { CommentFeedItem, CommentItemProps } from '@/shared/components/comment-feed-item/comment-feed-item'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Item = CommentItemProps

interface Props {
	items: Item[]
	limit?: number
	loading?: boolean
	className?: string
}

export const CommentFeedForm: React.FC<Props> = ({
	                                                 items,
	                                                 limit = 5,
	                                                 loading,
	                                                 className
                                                 }) => {
	
	if (loading) {
		return (
			<div className={className}>
				{...Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
					))}
			</div>
		)
	}
	
	return (
		<div className={cn('', className)}>
			<div className='flex flex-col pr-2 overflow-auto scrollbar'>
				{items.map((item, index) => (
					<CommentFeedItem
						key={index}
						endAdornment={item.endAdornment}
						postTitle={item.postTitle}
						postContent={item.postContent}
						postUrl={item.postUrl}
						authorName={item.authorName}
						authorUrl={item.authorUrl}
						authorAvatar={item.authorAvatar}
					/>
				))}
			</div>
		</div>
	)
}
