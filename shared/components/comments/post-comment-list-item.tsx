'use client'

import type { User } from '@/payload-types'
import { FullPostCommentBody } from '@/shared/components/comments/full-post-comments-items/full-post-comment-body'
import { FullPostCommentFooter } from '@/shared/components/comments/full-post-comments-items/full-post-comment-footer'
import { FullPostCommentHeader } from '@/shared/components/comments/full-post-comments-items/full-post-comment-header'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'

interface PostCommentListItemProps {
	postId: string
	communityId: number
	id: string
	content: string
	author: User
	timestamp: string
	fileUrl: string | null
	deleted: boolean
	currentUser: User | null
	isUpdated: boolean
	updatedAt: string
	socketUrl: string
	socketQuery: Record<string, string>
	className?: string
}

export const PostCommentListItem = ({
	postId,
	communityId,
	id,
	content,
	author,
	timestamp,
	fileUrl,
	deleted,
	currentUser,
	isUpdated,
	updatedAt,
	socketUrl,
	socketQuery,
	className
}: PostCommentListItemProps) => {
	const [isEditing, setIsEditing] = useState(false)

	const isMessageOwner =
		currentUser != null && Number(currentUser.id) === Number(author.id)

	const isOwner =
		currentUser != null &&
		Array.isArray(currentUser.userRoles) &&
		currentUser.userRoles.some(role => role.roleType === 'owner')

	const isAdmin =
		currentUser != null &&
		Array.isArray(currentUser.userRoles) &&
		currentUser.userRoles.some(role => role.roleType === 'admin')

	const isModerator =
		currentUser != null &&
		Array.isArray(currentUser.userRoles) &&
		currentUser.userRoles.some(role => role.roleType === 'moderator')

	const canModify = isMessageOwner || isAdmin || isOwner || isModerator

	const canDeleteMessage =
		!deleted && (isOwner || isAdmin || isMessageOwner || isModerator)

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
					updatedAt={updatedAt}
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
					canEditMessage={canModify}
					socketUrl={socketUrl}
					socketQuery={socketQuery}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			</div>
		</>
	)
}
