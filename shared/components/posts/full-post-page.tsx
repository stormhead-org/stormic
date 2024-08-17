'use client'

import { FullPostForm } from '@/shared/components/posts/full-post-items/full-post-form'
import { usePostById } from '@/shared/hooks/use-post-by-id'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	postId: string
	className?: string
}

export const FullPostPage: React.FC<Props> = ({
	                                              postId,
	                                              className
                                              }) => {
	
	const { post, loading } = usePostById(postId)
	
	const items = {
		postTitle: post.title,
		postContent: post.content,
		postImage: post.post_image,
		postUrl: '/p/' + post.post_id,
		authorName: post.author_fullName,
		authorUrl: '/u/' + post.author_id,
		authorAvatar: post.author_profile_picture,
		categoryName: post.category_name,
		categoryUrl: '/c/' + post.category_id,
		commentsCount: post.commentsCount,
		bookmarksCount: post.bookmarksCount,
		likesCount: post.likes_count,
		viewsCount: post.views_count,
		postTime: String(post.publication_date)
	}
	
	return (
		<div className={cn('', className)}>
			<FullPostForm
				items={items}
				loading={loading}
				className='mt-4'
			/>
		</div>
	)
}
