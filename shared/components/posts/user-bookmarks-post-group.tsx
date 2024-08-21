'use client'

import { InfoBlock } from '@/shared/components'
import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { useUserBookmarksPosts } from '@/shared/hooks/use-user-bookmarks-post'
import React from 'react'

interface Props {
	userId: string
	className?: string
}

export const UserBookmarksPostGroup: React.FC<Props> = ({
	                                                        userId,
	                                                        className
                                                        }) => {
	
	const { posts, loading } = useUserBookmarksPosts(userId)
	
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
		<div className={className}>
			{loading ? (
				<Skeleton className='h-6 mt-4 rounded-[8px]' />
			) : items.length > 0 ? (
				<PostForm
					limit={5}
					items={items}
					loading={loading}
					className='mt-4'
				/>
			) : (
				<div className='flex ml-[25%] mt-[25%]'>
					<InfoBlock
						title='Упс. Пусто'
						text='Для начала добавьте понравившееся посты в закладки'
						imageUrl='/assets/images/empty-box.png'
					/>
				</div>
			
			)}
		</div>
	)
}
