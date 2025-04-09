'use client'

import { CommentItem } from '@/shared/components/comments/comments-items/comment-item'
import { useCommentQuery } from '@/shared/hooks/use-comment-query'
import { useCommentScroll } from '@/shared/hooks/use-comment-scroll'
import { UseGlobalCommentSocket } from '@/shared/hooks/use-global-comment-socket'
import { cn } from '@/shared/lib/utils'
import { Loader2 } from 'lucide-react'
import React, { ElementRef, useRef } from 'react'

interface CommentFormProps {
	maxLengthHeader?: number
	maxLengthBody?: number
	apiUrl: string
	paramKey: 'postId' | 'conversationId' | 'global'
	paramValue: string
	className?: string
}

export const CommentForm: React.FC<CommentFormProps> = ({
	maxLengthHeader,
	maxLengthBody,
	apiUrl,
	paramKey,
	paramValue,
	className
}) => {
	const queryKey = 'global:comments'
	const globalUpdateKey = `global:comments:update`

	const chatRef = useRef<ElementRef<'div'>>(null)
	const bottomRef = useRef<ElementRef<'div'>>(null)

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useCommentQuery({
			queryKey,
			apiUrl,
			paramKey,
			paramValue
		})

	UseGlobalCommentSocket(queryKey, globalUpdateKey)

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
				<p className='text-xs text-zinc-500 dark:text-zinc-400'>
					Ошибка загрузки комментариев
				</p>
			</div>
		)
	}

	const allComments = data?.pages?.flatMap(page => page.docs) ?? []
	const uniqueComments = Array.from(
		new Map(allComments.map(msg => [msg.id, msg])).values()
	)

	return (
		<div ref={chatRef} className={cn('', className)}>
			{uniqueComments.map((message: any, index) => (
				<CommentItem
					key={`${message.id}-${index}`}
					postTitle={message.parentPost.title}
					content={message.content}
					postId={message.parentPost.id}
					authorName={message.author.name}
					authorId={message.author.id}
					authorAvatar={message.author.avatar?.url}
					maxLengthHeader={maxLengthHeader}
					maxLengthBody={maxLengthBody}
					media={message.media}
					deleted={message.hasDeleted}
					className='bg-secondary/25 hover:bg-primary/5 mt-4'
				/>
			))}
			{hasNextPage && (
				<div className='flex justify-center'>
					{isFetchingNextPage ? (
						<Loader2 className='h-6 w-6 text-zinc-500 animate-spin my-4' />
					) : (
						<button
							onClick={() => fetchNextPage()}
							className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition'
						>
							Загрузить больше комментариев
						</button>
					)}
				</div>
			)}
			<div ref={bottomRef} />
		</div>
	)
}
