'use client'

import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { FeedToggle } from '@/shared/components/ui/feed-toggle'
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
		authorId: item.author_id,
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
		likesCount: item.likes_count,
		viewsCount: item.views_count,
		postTime: String(item.publication_date)
	}))
	
	return (
		<div className={cn('', className)}>
			{items && items.length > 0 &&
				<>
					<div className='ml-6 mt-1 -mb-3'>
						<FeedToggle />
					</div>
				</>
			}
			<PostForm
				limit={5}
				items={items}
				loading={loading}
				className='mt-4'
			/>
		</div>
	)
}
