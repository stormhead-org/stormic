'use client'

import { PostForm } from '@/shared/components/post-item/post-form'
import { useUserPosts } from '@/shared/hooks/use-user-post'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	userId: string
	className?: string
}

export const UserProfilePosts: React.FC<Props> = ({
	                                                  userId,
	                                                  className
                                                  }) => {
	
	const { posts, loading } = useUserPosts(userId)
	
	const items = posts.map(item => ({
		postTitle: item.title,
		postContent: item.content,
		postImage: item.post_image,
		postUrl: '/p/' + item.post_id,
		authorName: item.author.fullName,
		authorUrl: '/u/' + item.author_id,
		authorAvatar: item.author.profile_picture,
		categoryName: item.category.category_name,
		categoryUrl: '/c/' + item.category_id,
		commentsCount: item.commentsCount,
		bookmarksCount: item.bookmarksCount,
		likesCount: item.likes_count,
		viewsCount: item.views_count,
		postTime: String(item.publication_date)
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
