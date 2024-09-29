'use client'

import { CommentFullPostGroup } from '@/shared/components/comments/comment-full-post-group'
import { FullPostForm } from '@/shared/components/posts/full-post-items/full-post-form'
import { usePostById } from '@/shared/hooks/use-post-by-id'
import { cn } from '@/shared/lib/utils'
import type { User } from '@prisma/client'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface ExtendedPost {
	post_id: number
	title: string
	post_image: string | null
	content: string
	author_id: number
	publication_date: Date
	last_edit_date: Date | null
	PostStatus: string
	views_count: number
	likes_count: number
	category_id: number
	author_fullName: string
	author_profile_picture: string
	category_name: string
	commentsCount: number
	bookmarksCount: number
	tags: string[]
}


interface Props {
	postId: number
	user?: User | undefined;
	className?: string
}

export const FullPostPage: React.FC<Props> = ({ postId, user, className }) => {
	const { post, loading } = usePostById(postId)
	
	// Проверяем, что post не является массивом и имеет содержимое
	const singlePost = (Array.isArray(post) && post.length > 0 ? post[0] : post) as ExtendedPost | null
	
	// Если post существует и преобразование успешно
	const items = singlePost
		? {
			authorId: singlePost.author_id,
			postId: singlePost.post_id,
			postTitle: singlePost.title,
			postContent: singlePost.content,
			postImage: singlePost.post_image,
			authorName: singlePost.author_fullName,
			authorUrl: '/u/' + singlePost.author_id,
			authorAvatar: singlePost.author_profile_picture,
			categoryName: singlePost.category_name,
			categoryUrl: '/c/' + singlePost.category_id,
			postTags: singlePost.tags,
			commentsCount: singlePost.commentsCount,
			likesCount: singlePost.likes_count,
			viewsCount: singlePost.views_count,
			postTime: String(singlePost.publication_date)
		}
		: null
	
	// Инициализируем useForm
	const form = useForm()
	
	return (
		<div className={cn('', className)}>
			<FormProvider {...form}>
				{items ? (
					<>
						<FullPostForm items={items} loading={loading} />
						<CommentFullPostGroup
							className='mb-4'
							postId={postId}
							user={user}
							commentsHeader={String(items.commentsCount)}
						/>
					</>
				) : (
					<div>Post not found or loading...</div>
				)}
			</FormProvider>
		</div>
	)
}
