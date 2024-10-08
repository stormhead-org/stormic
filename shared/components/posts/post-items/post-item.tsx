'use client'

import { PostBody } from '@/shared/components/posts/post-items/post-body'
import { PostFooter } from '@/shared/components/posts/post-items/post-footer'
import { PostHeader } from '@/shared/components/posts/post-items/post-header'
import { cn } from '@/shared/lib/utils'
import { createVisibilityObserver } from '@/shared/utils/visibility-observer'
import React, { useEffect, useRef } from 'react'

export interface PostItemProps {
	authorId: number
	postId: number
	postTitle: string
	postContent: string
	postImage?: string | null
	postUrl: string
	authorName: string
	authorUrl: string
	authorAvatar?: string | null
	categoryName: string
	categoryUrl: string
	commentsCount: number
	viewsCount: number
	postTime: string
	className?: string
	endAdornment?: React.ReactNode
}

export const PostItem: React.FC<PostItemProps> = ({
	                                                  authorId,
	                                                  postId,
	                                                  postTitle,
	                                                  postContent,
	                                                  postImage,
	                                                  postUrl,
	                                                  authorName,
	                                                  authorUrl,
	                                                  authorAvatar,
	                                                  categoryName,
	                                                  categoryUrl,
	                                                  commentsCount,
	                                                  viewsCount,
	                                                  postTime,
	                                                  endAdornment,
	                                                  className
                                                  }) => {
	
	const ref = useRef<HTMLDivElement>(null)
	
	useEffect(() => {
		const observer = createVisibilityObserver()
		
		if (ref.current) {
			observer.observe(ref.current)
		}
		
		return () => {
			if (ref.current) {
				observer.unobserve(ref.current)
			}
		}
	}, [postId])
	
	return (
		<div className={cn('bg-secondary rounded-md mb-4 p-4 hover:bg-primary/5', className)}>
			<div ref={ref} data-post-id={postId} className='post'>
				<PostHeader authorId={authorId} authorAvatar={String(authorAvatar)} authorUrl={authorUrl} authorName={authorName}
				            categoryName={categoryName} categoryUrl={categoryUrl} postTime={postTime} />
				<PostBody postTitle={postTitle} postContent={postContent} postImage={postImage} maxLength={300}
				          postUrl={postUrl} />
				<PostFooter postId={postId} commentsCount={commentsCount}
				            viewsCount={viewsCount} className='mt-4' />
				{endAdornment}
			</div>
		</div>
	)
}
