'use client'

import { CommentItem } from '@/shared/components/comments/comments-items/comment-item'
import { useCommentQuery } from '@/shared/hooks/use-comment-query'
import { useCommentScroll } from '@/shared/hooks/use-comment-scroll'
import { UseGlobalCommentSocket } from '@/shared/hooks/use-global-comment-socket'
import { cn } from '@/shared/lib/utils'
import { Comment, Post, User } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import React, { ElementRef, Fragment, useRef } from 'react'

const DATE_FORMAT = 'd MMM yyyy, HH:mm'

type CommentWithUserAndPost = Comment & {
	author: User;
	post: Post
};

interface CommentFormProps {
	maxLengthHeader?: number
	maxLengthBody?: number
	apiUrl: string;
	paramKey: 'postId' | 'conversationId' | 'global';
	paramValue: string;
	className?: string;
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
	
	const chatRef = useRef<ElementRef<'div'>>(null)
	const bottomRef = useRef<ElementRef<'div'>>(null)
	
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useCommentQuery({
			queryKey,
			apiUrl,
			paramKey,
			paramValue
		})
	
	UseGlobalCommentSocket(queryKey)
	
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
	
	return (
		<div ref={chatRef} className={cn('flex flex-col flex-1 overflow-y-auto h-[90vh] no-scrollbar', className)}>
			<div className='flex flex-col pr-2'>
				{data?.pages?.map((group, i) => (
					<Fragment key={i}>
						{group.items.map((message: CommentWithUserAndPost) =>
							<CommentItem
								key={message.comment_id}
								postTitle={message.post.title}
								content={message.content}
								postId={message.post_id}
								authorName={message.author.fullName}
								authorId={message.author_id}
								authorAvatar={message.author.profile_picture}
								maxLengthHeader={maxLengthHeader}
								maxLengthBody={maxLengthBody}
								fileUrl={message.fileUrl}
								deleted={message.deleted}
								className='bg-secondary/25 hover:bg-primary/5 mb-4'
							/>
						)}
					</Fragment>
				))}
			</div>
			<div ref={bottomRef} />
		</div>
	)
}
