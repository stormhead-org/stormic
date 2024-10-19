'use client'

import { PostCommentListItem } from '@/shared/components/comments/post-comment-list-item'
import { useCommentQuery } from '@/shared/hooks/use-comment-query'
import { useCommentScroll } from '@/shared/hooks/use-comment-scroll'
import { UseCommentSocket } from '@/shared/hooks/use-comment-socket'
import { cn } from '@/shared/lib/utils'
import { Comment, User } from '@prisma/client'
import { format } from 'date-fns'
import { Loader2, ServerCrash } from 'lucide-react'
import { ElementRef, Fragment, useRef } from 'react'

const DATE_FORMAT = 'd MMM yyyy, HH:mm'

type CommentWithUser = Comment & {
	author: User;
	children: CommentWithUser[]; // рекурсивный тип для вложенных комментариев
};

interface CommentItemsProps {
	currentUser: User | null;
	postId: string;
	apiUrl: string;
	socketUrl: string;
	socketQuery: Record<string, string>;
	paramKey: 'postId' | 'conversationId' | 'global';
	paramValue: string;
	className?: string;
}

// Классы для отступов
const getIndentationClass = (level: number) => {
	switch (level) {
		case 1:
			return 'pl-6';
		case 2:
			return 'pl-6';
		case 3:
			return 'pl-6';
		case 4:
			return 'pl-6';
		case 5:
			return 'pl-6';
		default:
			return 'pl-0'; // после 5 уровня отступ не увеличивается
	}
}

// Функция для рендера комментариев и их детей рекурсивно с ограничением отступа до 5 уровня
const renderCommentWithChildren = (
	message: CommentWithUser,
	currentUser: User | null,
	postId: string,
	socketUrl: string,
	socketQuery: Record<string, string>,
	level = 0 // добавляем уровень вложенности
) => {
	return (
		<div key={message.comment_id} className={getIndentationClass(level)}>
			<PostCommentListItem
				key={message.comment_id}
				postId={postId}
				id={String(message.comment_id)}
				currentUser={currentUser}
				author={message.author}
				content={message.content}
				fileUrl={message.fileUrl}
				deleted={message.deleted}
				timestamp={format(new Date(message.publication_date), DATE_FORMAT)}
				isUpdated={message.update_date !== message.publication_date}
				socketUrl={socketUrl}
				socketQuery={socketQuery}
				className='mt-4 p-0 pl-4 cursor-default border-l-4 border-blue-600'
			/>
			{Array.isArray(message.children) && message.children.length > 0 && (
				<>
					{message.children.map((child) => (
						<Fragment key={child.comment_id}>
							{renderCommentWithChildren(child, currentUser, postId, socketUrl, socketQuery, level + 1)}
						</Fragment>
					))}
				</>
			)}
		</div>
	)
}

export const PostCommentsList = ({
	                                 currentUser,
	                                 postId,
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
		<div ref={chatRef} className={cn('flex flex-col flex-1 overflow-y-auto h-screen no-scrollbar', className)}>
			<div className='flex flex-col mt-auto'>
				{data?.pages?.map((group, i) => (
					<Fragment key={i}>
						{group.items.map((message: CommentWithUser) =>
							renderCommentWithChildren(message, currentUser, postId, socketUrl, socketQuery)
						)}
					</Fragment>
				))}
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
