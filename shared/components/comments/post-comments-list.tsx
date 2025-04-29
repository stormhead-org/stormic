'use client'

import { type Comment, User } from '@/payload-types'
import { PostCommentListItem } from '@/shared/components/comments/post-comment-list-item'
import { useCommentQuery } from '@/shared/hooks/use-comment-query'
import { useCommentScroll } from '@/shared/hooks/use-comment-scroll'
import { UseCommentSocket } from '@/shared/hooks/use-comment-socket'
import { formatDateTime } from '@/shared/lib/formatDateTime'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import { Loader2, ServerCrash } from 'lucide-react'

export interface CommentWithChildren extends Omit<Comment, 'childrenComments'> {
	childrenComments: CommentWithChildren[]
}

interface CommentItemsProps {
	postId: string
	communityId: number
	permissions: Permissions | null
	chatRef: React.RefObject<HTMLDivElement | null>
	bottomRef: React.RefObject<HTMLDivElement | null>
	apiUrl: string
	socketUrl: string
	socketQuery: Record<string, string>
	paramKey: 'postId'
	paramValue: string
	currentUser?: User
	className?: string
}

const getIndentationClass = (level: number) => {
	return `pl-${(level + 1) * 4}`
}

const renderCommentWithChildren = (
	message: CommentWithChildren,
	postId: string,
	communityId: number,
	permissions: Permissions | null,
	socketUrl: string,
	socketQuery: Record<string, string>,
	currentUser?: User,
	level = 0
) => {
	const children = Array.isArray(message.childrenComments)
		? message.childrenComments
		: []

	const author = typeof message.author === 'object' ? message.author : null
	if (!author) {
		return null
	}

	const media =
		message.media && typeof message.media === 'object'
			? message.media
			: undefined

	return (
		<div key={message.id} className={getIndentationClass(level)}>
			<PostCommentListItem
				postId={postId}
				communityId={communityId}
				id={String(message.id)}
				currentUser={currentUser}
				permissions={permissions}
				author={author}
				content={message.content}
				media={media}
				deleted={message.hasDeleted ?? false}
				timestamp={formatDateTime(message.createdAt)}
				isUpdated={message.hasUpdated ?? false}
				socketUrl={socketUrl}
				socketQuery={socketQuery}
				className='mt-4 p-0 pl-4 cursor-default border-l-2 border-theme'
			/>
			{children.length > 0 && (
				<div className='ml-4'>
					{children.map(child =>
						renderCommentWithChildren(
							child,
							postId,
							communityId,
							permissions,
							socketUrl,
							socketQuery,
							currentUser,
							level + 1
						)
					)}
				</div>
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
	permissions,
	chatRef,
	bottomRef,
	paramKey,
	paramValue,
	className
}: CommentItemsProps) => {
	const queryKey = `chat:${postId}`
	const addKey = `chat:${postId}:messages`
	const updateKey = `chat:${postId}:messages:update`

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useCommentQuery({
			queryKey,
			apiUrl,
			paramKey,
			paramValue
		})

	// Используем наш исправленный сокет-хук
	UseCommentSocket({ queryKey, addKey, updateKey })

	useCommentScroll({
		chatRef,
		bottomRef,
		loadMore: fetchNextPage,
		shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
		count: data?.pages?.[0]?.docs?.length ?? 0
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

	// Получаем все загруженные топ-уровневые комментарии из всех страниц
	const allComments = Array.from(
		new Map(
			(data?.pages?.flatMap(page => page.docs) ?? []).map((comment: any) => [
				comment.id,
				comment
			])
		).values()
	)

	return (
		<div ref={chatRef} className={cn('flex flex-col flex-1', className)}>
			<div className='flex flex-col mt-auto'>
				{allComments.map((message: CommentWithChildren) =>
					renderCommentWithChildren(
						message,
						postId,
						communityId,
						permissions,
						socketUrl,
						socketQuery,
						currentUser,
						0
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
