'use client'

import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { useCategoryPosts } from '@/shared/hooks/use-category-post'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	categoryId: string
	className?: string
}

export const CategoryProfilePostGroup: React.FC<Props> = ({
	                                                          categoryId,
	                                                          className
                                                          }) => {
	
	const { posts, loading } = useCategoryPosts(categoryId)
	
	const items = posts.map((item: any) => ({
		postTitle: item.title,
		postContent: item.content,
		postImage: item.post_image,
		postUrl: '/p/' + item.post_id,
		authorName: item.author_fullName,
		authorUrl: '/u/' + item.author_id,
		authorAvatar: item.author_profile_picture,
		categoryName: item.category_name,
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
