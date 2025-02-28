'use client'

import { Post, type User } from '@/payload-types'
import { CommentFullPostGroup } from '@/shared/components/comments/comment-full-post-group'
import { cn } from '@/shared/lib/utils'
import { useSession } from '@/shared/providers/SessionProvider'
import React from 'react'
import { FullPostForm } from './full-post-items/full-post-form'

interface Props {
	post: Post[]
	className?: string
}

export const FullPostPage: React.FC<Props> = ({ post, className }) => {
	const session = useSession()
	const currentUser = session && (session.user as User)
	const currentPost = post[0];

	return (
		<div className={cn('', className)}>
			<FullPostForm
				post={currentPost}
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
