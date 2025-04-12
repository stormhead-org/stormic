'use client'

import { User } from '@/payload-types'
import { CommentInput } from '@/shared/components/comments/comment-input-items/comment-input'
import { PostCommentsList } from '@/shared/components/comments/post-comments-list'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import { ListFilter } from 'lucide-react'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	postId: number
	communityId: number
	permissions: Permissions | null
	chatRef: React.RefObject<HTMLDivElement | null>
	bottomRef: React.RefObject<HTMLDivElement | null>
	currentUser?: User | null
	commentsHeader: string
	className?: string
}

export const CommentFullPostGroup: React.FC<Props> = ({
	postId,
	communityId,
	permissions,
	chatRef,
	bottomRef,
	currentUser,
	commentsHeader,
	className
}) => {
	// const { formatMessage } = useIntl()

	return (
		<div className={cn('bg-secondary rounded-md p-4', className)}>
			<div className='flex justify-between items-center'>
				{commentsHeader > String(0) ? (
					<p className='pl-4 text-lg cursor-default'>
						{commentsHeader}{' '}
						{/* {formatMessage({ id: 'commentInputForm.commentsHeaderCount' })} */}
						комментариев
					</p>
				) : (
					<p className='pl-1 text-lg cursor-default'>
						{/* {formatMessage({ id: 'commentInputForm.commentsHeaderEmpty' })} */}
						Тут пока никого нет...
					</p>
				)}
				<div className='flex items-center gap-2'>
					<div className='group'>
						<p className='flex items-center group-hover:text-blue-600 font-bold'>
							<ListFilter className='group-hover:bg-blue-600/20 rounded-full ml-2 w-7 h-7 p-1 cursor-pointer' />
						</p>
					</div>
				</div>
			</div>

			<CommentInput
				apiUrl={'/api/socket/posts/comments'}
				query={{
					postId: postId,
					communityId: communityId
				}}
			/>
			<PostCommentsList
				currentUser={currentUser !== null ? currentUser : undefined}
				postId={String(postId)}
				communityId={communityId}
				permissions={permissions}
				chatRef={chatRef}
				bottomRef={bottomRef}
				apiUrl={`/api/posts/${postId}/comments`}
				socketUrl={'/api/socket/posts/comments'}
				socketQuery={{
					postId: String(postId)
				}}
				paramKey='postId'
				paramValue={String(postId)}
			/>
		</div>
	)
}
