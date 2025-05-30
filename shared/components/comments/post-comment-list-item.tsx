'use client'

import type { Media, User } from '@/payload-types'
import { FullPostCommentBody } from '@/shared/components/comments/full-post-comments-items/full-post-comment-body'
import { FullPostCommentFooter } from '@/shared/components/comments/full-post-comments-items/full-post-comment-footer'
import { FullPostCommentHeader } from '@/shared/components/comments/full-post-comments-items/full-post-comment-header'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'
import useSWR from 'swr'

interface PostCommentListItemProps {
	id: string
	postId: string
	communityId: number
	content: string
	author: User
	timestamp: string
	media?: Media
	deleted: boolean
	currentUser?: User
	permissions: Permissions | null
	isUpdated: boolean
	socketUrl: string
	socketQuery: Record<string, string>
	className?: string
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const PostCommentListItem = ({
	id,
	postId,
	communityId,
	content,
	author,
	timestamp,
	media,
	deleted,
	currentUser,
	permissions,
	isUpdated,
	socketUrl,
	socketQuery,
	className
}: PostCommentListItemProps) => {
	const [isEditing, setIsEditing] = useState(false)

	const isMessageOwner = currentUser != null && currentUser.id === author.id
	const permissionCommentDelete =
		permissions?.COMMUNITY_COMMENTS_DELETE ?? false
	const isCommunityOwner = permissions?.COMMUNITY_OWNER ?? false
	const canDeleteMessage =
		!deleted && (isMessageOwner || permissionCommentDelete || isCommunityOwner)
	const canEditMessage = !deleted && isMessageOwner

	// Запрашиваем права автора
	const { data: authorPermissions, error } = useSWR<Permissions | null>(
		`/api/permissions/${author.id}/${communityId}`,
		fetcher,
		{
			fallbackData: null,
			revalidateOnFocus: false,
			dedupingInterval: 60000
		}
	)

	// Формируем roleIconMap как массив ролей
	const roleIconMap: ('hostOwner' | 'communityOwner')[] = []
	if (authorPermissions?.HOST_OWNER) {
		roleIconMap.push('hostOwner')
	}
	if (authorPermissions?.COMMUNITY_OWNER) {
		roleIconMap.push('communityOwner')
	}

	return (
		<>
			<div className={cn('rounded-xl p-2 w-full', className)}>
				<FullPostCommentHeader
					author={author}
					roleIconMap={roleIconMap}
					publicationDate={timestamp}
				/>

				<FullPostCommentBody
					id={id}
					content={content}
					media={media}
					deleted={deleted}
					isUpdated={isUpdated}
					socketUrl={socketUrl}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
					socketQuery={socketQuery}
				/>
				{!deleted && (
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
				)}
			</div>
		</>
	)
}
