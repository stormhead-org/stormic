'use client'

import { PostForm } from '@/shared/components/post-item/post-form'
import { cn } from '@/shared/lib/utils'
import type { Post } from '@prisma/client'
import { format } from 'date-fns'
import React from 'react'

interface Props {
	posts: Post[]
	loading?: boolean
	className?: string
}

export const UserProfilePosts: React.FC<Props> = ({
	                                                  posts,
	                                                  loading,
	                                                  className
                                                  }) => {
	const items = posts.map(item => ({
		postTitle: item.title,
		postContent: item.content,
		postImage: item.post_image,
		postUrl: '/p/' + item.post_id,
		authorName: item.author?.fullName || 'Anonymous',
		authorUrl: '/u/' + item.author_id,
		authorAvatar: item.author?.profile_picture || '',
		categoryName: item.category?.category_name || 'Uncategorized',
		categoryUrl: '/c/' + item.category_id,
		commentsCount: item.commentsCount || 0,
		bookmarksCount: item.bookmarksCount || 0,
		likesCount: item.likes_count || 0,
		viewsCount: item.views_count || 0,
		postTime: format(new Date(item.publication_date), 'dd.MM.yy') // Форматируем дату
	}))
	
	return (
		<div className={cn('', className)}>
			<PostForm
				limit={5}
				items={items}
				loading={loading}
				className='mt-4'
			/>
		</div>
	)
}
