'use client'

import { type Comment, User } from '@/payload-types'
import { PostCommentListItem } from '@/shared/components/comments/post-comment-list-item'
import { useCommentQuery } from '@/shared/hooks/use-comment-query'
import { useCommentScroll } from '@/shared/hooks/use-comment-scroll'
import { UseCommentSocket } from '@/shared/hooks/use-comment-socket'
import { formatDateTime } from '@/shared/lib/formatDateTime'
import { cn } from '@/shared/lib/utils'
import { Loader2, ServerCrash } from 'lucide-react'
import { ElementRef, useRef } from 'react'

const DATE_FORMAT = 'd MMM yyyy, HH:mm'

type CommentWithUser = Comment & {
	author: User
	childrenComments: CommentWithUser[]
}

interface CommentItemsProps {
	currentUser: User | null
	postId: string
	communityId: number
	apiUrl: string
	socketUrl: string
	socketQuery: Record<string, string>
	paramKey: 'postId' | 'conversationId' | 'global'
	paramValue: string
	className?: string
}

const getIndentationClass = (level: number) => {
	switch (level) {
		case 1:
			return 'pl-6'
		case 2:
			return 'pl-6'
		case 3:
			return 'pl-6'
		case 4:
			return 'pl-6'
		case 5:
			return 'pl-6'
		default:
			return 'pl-0'
	}
}

const renderCommentWithChildren = (
	message: CommentWithUser,
	currentUser: User | null,
	postId: string,
	communityId: number,
	socketUrl: string,
	socketQuery: Record<string, string>,
	level = 0,
	keyProp?: string | number
) => {
	const children = Array.isArray(message.childrenComments)
		? message.childrenComments
		: []

	return (
		<div key={keyProp ?? message.id} className={getIndentationClass(level)}>
			<PostCommentListItem
				postId={postId}
				communityId={communityId}
				id={String(message.id)}
				currentUser={currentUser}
				author={message.author}
				content={message.content}
				fileUrl={message.commentMedia?.url}
				deleted={message.hasDeleted}
				timestamp={formatDateTime(message.createdAt)}
				isUpdated={message.updatedAt !== message.createdAt}
				socketUrl={socketUrl}
				socketQuery={socketQuery}
				className='mt-4 p-0 pl-4 cursor-default border-l-4 border-blue-600'
			/>
			{children.length > 0 &&
				children.map(child =>
					renderCommentWithChildren(
						child,
						currentUser,
						postId,
						communityId,
						socketUrl,
						socketQuery,
						level + 1,
						child.id
					)
				)}
		</div>
	)
}

export const PostCommentsList = ({
	currentUser,
	postId,
	communityId,
	apiUrl,
	socketUrl,
	socketQuery,
	paramKey,
	paramValue,
	className
}: CommentItemsProps) => {
	const queryKey = `chat:${postId}`
	const addKey = `chat:${postId}:messages`
	const updateKey = `chat:${postId}:messages:update`

	const chatRef = useRef<ElementRef<'div'>>(null)
	const bottomRef = useRef<ElementRef<'div'>>(null)

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useCommentQuery({
			queryKey,
			apiUrl,
			paramKey,
			paramValue
		})

	UseCommentSocket({ queryKey, addKey, updateKey })

	useCommentScroll({
		chatRef,
		bottomRef,
		loadMore: fetchNextPage,
		shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
		count: data?.pages?.[0]?.items?.length ?? 0
	})

	if (status === 'pending') {
		return (
			<div className='flex flex-col flex-1 justify-center items-center'>
				<Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4' />
				<p className='text-xs text-zinc-500 dark:text-zinc-400'>
					Загрузка комментариев...
				</p>
			</div>
		)
	}

	if (status === 'error') {
		return (
			<div className='flex flex-col flex-1 justify-center items-center'>
				<ServerCrash className='h-7 w-7 text-zinc-500 my-4' />
				<p className='text-xs text-zinc-500 dark:text-zinc-400'>
					Что-то пошло не так...
				</p>
			</div>
		)
	}

	return (
		<div
			ref={chatRef}
			className={cn(
				'flex flex-col flex-1 overflow-y-auto h-screen no-scrollbar',
				className
			)}
		>
			<div className='flex flex-col mt-auto'>
				{data?.pages?.map((group, groupIndex) =>
					group.items.map((message: CommentWithUser) =>
						renderCommentWithChildren(
							message,
							currentUser,
							postId,
							communityId,
							socketUrl,
							socketQuery,
							0,
							message.id
						)
					)
				)}
			</div>
			{!hasNextPage && <div className='flex-1' />}
			{hasNextPage && (
				<div className='flex justify-center'>
					{isFetchingNextPage ? (
						<Loader2 className='h-6 w-6 text-zinc-500 animate-spin my-4' />
					) : (
						<button
							onClick={() => fetchNextPage()}
							className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition'
						>
							Загрузить комментарии
						</button>
					)}
				</div>
			)}
			<div ref={bottomRef} />
		</div>
	)
}
