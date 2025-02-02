'use client'

import { PostItem, PostItemProps } from '@/shared/components/posts/post-items/post-item'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Skeleton } from '../../ui/skeleton'

type Item = PostItemProps

interface Props {
	items: Item[]
	limit?: number
	loading?: boolean
	className?: string
}

export const PostForm: React.FC<Props> = ({
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
			{items.map((item, index) => (
				<PostItem
					key={index}
					authorId={item.authorId}
					postId={item.postId}
					postTitle={item.postTitle}
					postContent={item.postContent}
					postImage={item.postImage}
					postUrl={item.postUrl}
					authorName={item.authorName}
					authorUrl={item.authorUrl}
					authorAvatar={item.authorAvatar}
					categoryName={item.categoryName}
					categoryUrl={item.categoryUrl}
					commentsCount={item.commentsCount}
					viewsCount={item.viewsCount}
					postTime={item.postTime}
					endAdornment={item.endAdornment}
				/>
			))}
		</div>
	)
}
