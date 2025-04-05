'use client'

import { Community, Post } from '@/payload-types'
import { PostNotFound } from '@/shared/components/info-blocks/post-not-found'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { FullPostForm } from './full-post-items/full-post-form'

interface Props {
	post: Post[]
	communities: Community[]
	className?: string
}

export const FullPostPage: React.FC<Props> = ({
	post,
	communities,
	className
}) => {
	if (!post || post.length === 0) {
		return <PostNotFound />
	}

	const currentPost = post[0]

	return (
		<div className={cn('', className)}>
			<FullPostForm
				post={currentPost}
				communities={communities}
				// loading={loading}
			/>
			{/* <CommentFullPostGroup */}
			{/* 	className='mb-4' */}
			{/* 	postId={currentPost.id} */}
			{/* 	communityId={currentPost.community.id} */}
			{/* 	currentUser={currentUser} */}
			{/* 	commentsHeader={String(0)} */}
			{/* /> */}
		</div>
	)
}
