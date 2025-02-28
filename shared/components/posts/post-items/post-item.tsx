'use client'

import { Post } from '@/payload-types'
import { PostBody } from '@/shared/components/posts/post-items/post-body'
import { PostFooter } from '@/shared/components/posts/post-items/post-footer'
import { PostHeader } from '@/shared/components/posts/post-items/post-header'
import { formatDateTime } from '@/shared/lib/formatDateTime'
import { cn } from '@/shared/lib/utils'
// import { createVisibilityObserver } from '@/shared/utils/visibility-observer'
// import React, { useEffect, useRef } from 'react'

export const PostItem: React.FC<{
	post: Post
	relatedPost?: boolean
	className?: string
}> = ({ post, relatedPost = false, className }) => {
	// const ref = useRef<HTMLDivElement>(null)

	// useEffect(() => {
	// 	const observer = createVisibilityObserver()

	// 	if (ref.current) {
	// 		observer.observe(ref.current)
	// 	}

	// 	return () => {
	// 		if (ref.current) {
	// 			observer.unobserve(ref.current)
	// 		}
	// 	}
	// }, [postId])

	return (
		<div
			className={cn(
				'bg-secondary rounded-md mb-4 p-4 hover:bg-primary/5',
				className
			)}
		>
			<div data-post-id={post.id} className='post'>
				<PostHeader
					authorId={post.author?.id}
					authorUrl={`/u/${post.author?.id}` || '#'}
					authorName={post.author?.name || '#'}
					authorAvatar={post.author?.authorAvatar?.url}
					categoryName={post.community?.title || '#'}
					categoryUrl={post.community ? `/c/${post.community.id}` : '#'}
					postTime={formatDateTime(post.publishedAt ? post.publishedAt : '#')}
				/>
				<PostBody
					postTitle={post.title}
					postContent={post.content}
					postHero={post}
					maxLength={300}
					postUrl={`/p/${post.id}`}
				/>
				{!relatedPost ? (
					<PostFooter
						postId={Number(post.id)}
						// commentsCount={}
						// commentsCount={0}
						// viewsCount={0}
						className='mt-4'
					/>
				) : null}
			</div>
		</div>
	)
}
