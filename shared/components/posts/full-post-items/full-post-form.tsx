'use client'

import { FullPostItem, FullPostItemProps } from '@/shared/components/posts/full-post-items/full-post-item'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Skeleton } from '../../ui/skeleton'

type Item = FullPostItemProps

interface Props {
	items: Item
	loading?: boolean
	className?: string
}

export const FullPostForm: React.FC<Props> = ({
	                                              items,
	                                              loading,
	                                              className
                                              }) => {
	
	if (loading) {
		return (
			<div className={className}>
				<Skeleton className='h-6 mb-4 rounded-[8px]' />
			</div>
		)
	}
	
	return (
		<div className={cn('', className)}>
			<FullPostItem
				authorId={items.authorId}
				postId={items.postId}
				postTitle={items.postTitle}
				postContent={items.postContent}
				postImage={items.postImage}
				authorName={items.authorName}
				authorUrl={items.authorUrl}
				authorAvatar={items.authorAvatar}
				categoryName={items.categoryName}
				categoryUrl={items.categoryUrl}
				postTags={items.postTags}
				commentsCount={items.commentsCount}
				bookmarksCount={items.bookmarksCount}
				viewsCount={items.viewsCount}
				postTime={items.postTime}
			/>
		</div>
	)
}
