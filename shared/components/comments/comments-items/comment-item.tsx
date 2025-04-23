import { Comment, Community, Media, Post, User } from '@/payload-types'
import { CommentBody } from '@/shared/components/comments/comments-items/comment-body'
import { CommentHeader } from '@/shared/components/comments/comments-items/comment-header'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl, getRelationProp } from '@/shared/utils/payload/getTypes'
import React from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface CommentItemProps {
	comment: Comment
	maxLengthHeader?: number
	maxLengthBody?: number
	className?: string
}

export const CommentItem: React.FC<CommentItemProps> = ({
	comment,
	maxLengthHeader,
	maxLengthBody,
	className
}) => {
	const authorAvatar =
		typeof comment.author === 'object'
			? getMediaUrl(comment.author.avatar, '/logo.png')
			: '/logo.png'

	const authorId = getRelationProp<User, 'id'>(comment.author, 'id', 0)

	const authorName = getRelationProp<User, 'name'>(comment.author, 'name', '')

	const postId = getRelationProp<Post, 'id'>(comment.parentPost, 'id', 0)

	const postTitle = getRelationProp<Post, 'title'>(
		comment.parentPost,
		'title',
		''
	)

	const communityId = getRelationProp<Community, 'id'>(
		comment.community,
		'id',
		0
	)

	// Запрашиваем права автора
	const { data: authorPermissions, error } = useSWR<Permissions | null>(
		`/api/permissions/${authorId}/${communityId}`,
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
		<div className={cn('rounded-md p-2 w-full', className)}>
			<CommentHeader
				authorAvatar={authorAvatar}
				authorUrl={`/u/${authorId}`}
				authorName={authorName}
				postTitle={postTitle}
				roleIconMap={roleIconMap}
				maxLength={maxLengthHeader}
				publicationDate={comment.createdAt}
				postUrl={`/p/${postId}`}
			/>
			<CommentBody
				content={comment.content}
				maxLength={maxLengthBody}
				postUrl={postId ? `/p/${postId}` : '#'}
				media={comment.media as Media}
				deleted={comment.hasDeleted as boolean}
			/>
		</div>
	)
}
