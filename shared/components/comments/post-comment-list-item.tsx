'use client'

import type { User } from '@/payload-types'
import { FullPostCommentBody } from '@/shared/components/comments/full-post-comments-items/full-post-comment-body'
import { FullPostCommentFooter } from '@/shared/components/comments/full-post-comments-items/full-post-comment-footer'
import { FullPostCommentHeader } from '@/shared/components/comments/full-post-comments-items/full-post-comment-header'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'

interface PostCommentListItemProps {
	id: string
	postId: string
	communityId: number
	content: string
	author: User
	timestamp: string
	fileUrl: string | null
	deleted: boolean
	currentUser: User | null
	isUpdated: boolean
	socketUrl: string
	socketQuery: Record<string, string>
	className?: string
}

export const PostCommentListItem = ({
	id,
	postId,
	communityId,
	content,
	author,
	timestamp,
	fileUrl,
	deleted,
	currentUser,
	isUpdated,
	socketUrl,
	socketQuery,
	className
}: PostCommentListItemProps) => {
	const [isEditing, setIsEditing] = useState(false)

	const isMessageOwner = currentUser != null && currentUser.id === author.id
	const isOwner =
		currentUser != null && currentUser.systemRoles.includes('owner')
	// const isAdmin =
	// 	currentUser != null && currentUser.userRoles.roleType === 'admin'
	// const isModerator =
	// 	currentUser != null && currentUser.userRoles.roleType === 'moderator'
	const canDeleteMessage = !deleted && (isOwner || isMessageOwner)
	const canEditMessage = !deleted && isMessageOwner && !fileUrl

	return (
		<>
			<div className={cn('rounded-md p-2 w-full', className)}>
				<FullPostCommentHeader author={author} publicationDate={timestamp} />

				<FullPostCommentBody
					id={id}
					content={content}
					fileUrl={fileUrl}
					deleted={deleted}
					isUpdated={isUpdated}
					socketUrl={socketUrl}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
					socketQuery={socketQuery}
				/>

				<FullPostCommentFooter
					postId={Number(postId)}
					communityId={Number(communityId)}
					id={id}
					parentCommentAuthorName={author.name}
					canDeleteMessage={canDeleteMessage}
					canEditMessage={canEditMessage}
					socketUrl={socketUrl}
					socketQuery={socketQuery}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			</div>
		</>
	)
}
