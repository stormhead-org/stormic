'use client'

import { type Community, HostSetting, User } from '@/payload-types'
import { CommentInput } from '@/shared/components/comments/comment-input-items/comment-input'
import { PostCommentsList } from '@/shared/components/comments/post-comments-list'
import { MobileNewCommentButton } from '@/shared/components/mobile/mobile-new-comment-button'
import { Button } from '@/shared/components/ui/button'
import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@/shared/components/ui/drawer'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Drawer } from 'vaul'
// import { useIntl } from 'react-intl'

interface Props {
	postId: number
	communityId: number
	host: HostSetting
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
	host,
	permissions,
	chatRef,
	bottomRef,
	currentUser,
	commentsHeader,
	className
}) => {
	// const { formatMessage } = useIntl()

	const isMobile = useIsMobile()

	return (
		<div className={cn('bg-secondary rounded-xl p-1 lg:p-4', className)}>
			<div className='flex justify-between items-center mt-2'>
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
				{/* <div className='flex items-center gap-2'>
					<div className='group'>
						<p className='flex items-center group-hover:text-blue-600 font-bold'>
							<ListFilter className='group-hover:bg-blue-600/20 rounded-full ml-2 w-7 h-7 p-1 cursor-pointer' />
						</p>
					</div>
				</div> */}
			</div>

			{!isMobile ? (
				<CommentInput
					apiUrl={'/api/socket/posts/comments'}
					query={{
						postId: postId,
						communityId: communityId
					}}
					isMobile={false}
				/>
			) : (
				<MobileNewCommentButton
					host={host}
					apiUrl={'/api/socket/posts/comments'}
					query={{
						postId: postId,
						communityId: communityId
					}}
					currentUser={currentUser !== null ? currentUser : undefined}
					className='mx-2'
				/>
			)}
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
