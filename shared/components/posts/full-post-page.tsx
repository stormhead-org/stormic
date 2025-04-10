'use client'

import { Community, Post, User } from '@/payload-types'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import { usePostLikesStore } from '@/shared/stores/post-likes-store'
import React, { ElementRef, useRef } from 'react'
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
	const chatRef = useRef<ElementRef<'div'>>(null)
	const bottomRef = useRef<ElementRef<'div'>>(null)
	const commentsCount = usePostLikesStore(
		state => state.commentsCount[post.id] || 0
	)

	return (
		<div ref={chatRef} className={cn('', className)}>
			<FullPostForm
				post={post}
				communities={communities}
				permissions={permissions}
				commentsCount={commentsCount}
				// loading={loading}
			/>
			<CommentFullPostGroup
				postId={post.id}
				communityId={post.community.id}
				permissions={permissions}
				chatRef={chatRef}
				bottomRef={bottomRef}
				currentUser={currentUser}
				commentsHeader={String(commentsCount)}
			/>
			<div ref={bottomRef} />
		</div>
	)
}
