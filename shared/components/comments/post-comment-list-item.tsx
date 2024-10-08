'use client'

import { FullPostCommentBody } from '@/shared/components/comments/full-post-comments-items/full-post-comment-body'
import { FullPostCommentFooter } from '@/shared/components/comments/full-post-comments-items/full-post-comment-footer'
import { FullPostCommentHeader } from '@/shared/components/comments/full-post-comments-items/full-post-comment-header'
import { cn } from '@/shared/lib/utils'
import { User, UserRoleType } from '@prisma/client'
import React, { useState } from 'react'

interface PostCommentListItemProps {
	postId: string
	id: string
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
	                                    postId,
	                                    id,
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
	
	const isOwner = currentUser != null && currentUser.role === UserRoleType.OWNER
	const isAdmin = currentUser != null && currentUser.role === UserRoleType.ADMIN
	const isAuthor = currentUser != null && currentUser.id === author.id
	const canDeleteMessage = !deleted && (isOwner || isAdmin || isAuthor)
	const canEditMessage = !deleted && isAuthor && !fileUrl
	
	return (
		<>
			<div className={cn('rounded-md p-2 w-full', className)}>
				<FullPostCommentHeader
					author={author}
					publicationDate={timestamp}
				/>
				
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
					id={id}
					parentCommentAuthorName={author.fullName}
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
