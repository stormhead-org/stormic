'use client'

import { Community, Post, User } from '@/payload-types'
import { PostNotFound } from '@/shared/components/info-blocks/post-not-found'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { CommentFullPostGroup } from '../comments/comment-full-post-group'
import { FullPostForm } from './full-post-items/full-post-form'

interface Props {
	post: Post
	communities: Community[]
	permissions: Permissions | null
	currentUser?: User | null
	className?: string
}

export const FullPostPage: React.FC<Props> = ({
	post,
	communities,
	permissions,
	currentUser,
	className
}) => {

	return (
		<div className={cn('', className)}>
			<FullPostForm
				post={post}
				communities={communities}
				permissions={permissions}
				// loading={loading}
			/>
			<CommentFullPostGroup
				className='mb-4'
				postId={post.id}
				communityId={post.community.id}
				permissions={permissions}
				currentUser={currentUser}
				commentsHeader={String(0)}
			/>
		</div>
	)
}
