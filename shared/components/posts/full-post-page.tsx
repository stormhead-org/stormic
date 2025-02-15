'use client'

import { Post } from '@/payload-types'
import { CommentFullPostGroup } from '@/shared/components/comments/comment-full-post-group'
import { cn } from '@/shared/lib/utils'
import { useSession } from '@/shared/providers/SessionProvider'
import React from 'react'
import { FullPostForm } from './full-post-items/full-post-form'

interface Props {
	post: Post
	className?: string
}

export const FullPostPage: React.FC<Props> = ({ post, className }) => {
	const session = useSession()
	const currentUser = session && session.user.id

	return (
		<div className={cn('', className)}>
			<FullPostForm
				post={post}
				// loading={loading}
			/>
			<CommentFullPostGroup
				className='mb-4'
				postId={postId}
				currentUser={currentUser}
				commentsHeader={String(items.commentsCount)}
			/>
		</div>
	)
}
