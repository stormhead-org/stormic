'use client'

import type { Comment } from '@/payload-types'
import { CommentItem } from '@/shared/components/comments/comments-items/comment-item'
import { useCommentQuery } from '@/shared/hooks/use-comment-query'
import { useCommentScroll } from '@/shared/hooks/use-comment-scroll'
import { UseGlobalCommentSocket } from '@/shared/hooks/use-global-comment-socket'
import { cn } from '@/shared/lib/utils'
import { Loader2 } from 'lucide-react'
import React, { ElementRef, useRef } from 'react'

interface CommentFormProps {
	maxLengthHeader?: number;
	maxLengthBody?: number;
	apiUrl: string;
	className?: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
	                                                        maxLengthHeader,
	                                                        maxLengthBody,
	                                                        apiUrl,
	                                                        className,
                                                        }) => {
	const queryKey = 'global:comments';
	const globalUpdateKey = `global:comments:update`;
	
	const chatRef = useRef<ElementRef<'div'>>(null);
	const bottomRef = useRef<ElementRef<'div'>>(null);
	
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useCommentQuery({
		queryKey,
		apiUrl,
	});
	
	UseGlobalCommentSocket(queryKey, globalUpdateKey);
	
	useCommentScroll({
		chatRef,
		bottomRef,
		loadMore: fetchNextPage,
		shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
		count: data?.pages?.[0]?.docs?.length ?? 0, // Безопасный доступ с fallback
	});
	
	if (status === 'pending') {
		return (
			<div className='flex flex-col flex-1 justify-center items-center'>
				<Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4' />
				<p className='text-xs text-zinc-500 dark:text-zinc-400'>
					Загрузка комментариев...
				</p>
			</div>
		);
	}
	
	console.log('Data structure:', data);
	
	// Проверяем, что data и data.pages определены
	if (!data || !data.pages || data.pages.length === 0) {
		return (
			<div ref={chatRef} className={cn('', className)}>
				<p className='text-xs text-zinc-500'>Нет комментариев</p>
				<div ref={bottomRef} />
			</div>
		);
	}
	
	return (
		<div ref={chatRef} className={cn('', className)}>
			{data.pages.map((page, pageIndex) =>
				page.docs.map((message: Comment) => (
					<CommentItem
						key={message.id}
						postTitle={
							typeof message.parentPost === 'object' ? (message.parentPost as any).title : ''
						}
						content={message.content}
						postId={
							typeof message.parentPost === 'object' ? (message.parentPost as any).id : (message.parentPost as number)
						}
						authorName={
							typeof message.author === 'object' ? (message.author as any).name : message.author || 'Unknown'
						}
						authorId={
							typeof message.owner === 'object' ? (message.owner as any).id : (message.owner as number)
						}
						authorAvatar={
							typeof message.owner === 'object' && (message.owner as any).profile_picture
								? (message.owner as any).profile_picture
								: ''
						}
						maxLengthHeader={maxLengthHeader}
						maxLengthBody={maxLengthBody}
						fileUrl={
							typeof message.commentMedia === 'object' && message.commentMedia
								? (message.commentMedia as any).url || ''
								: ''
						}
						deleted={message.hasDeleted}
						className='bg-secondary/25 hover:bg-primary/5 mt-4'
					/>
				))
			)}
			<div ref={bottomRef} />
		</div>
	);
};
