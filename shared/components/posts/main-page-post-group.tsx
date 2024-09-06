'use client'

import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { usePosts } from '@/shared/hooks/use-posts'
import React from 'react'

interface Props {
	className?: string
}

export const MainPagePostGroup: React.FC<Props> = ({ className }) => {
	
	const { posts, loading } = usePosts()
	
	const items = posts.map((item: any) => ({
		postId: item.post_id,
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
		viewsCount: item.views_count,
		postTime: String(item.publication_date)
	}))
	
	return (
		<>
			<PostForm
				limit={5}
				items={items}
				loading={loading}
				className='mt-4'
			/>
		</>
	)
}
