import { PostBody } from '@/shared/components/post-item/post-body'
import { PostFooter } from '@/shared/components/post-item/post-footer'
import { PostHeader } from '@/shared/components/post-item/post-header'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'

export interface PostItemProps {
	endAdornment?: React.ReactNode
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
	bookmarksCount: number
	likesCount: number
	viewsCount: number
	postTime: string
	className?: string
}

export const PostItem: React.FC<PostItemProps> = ({
	                                                  endAdornment,
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
	                                                  bookmarksCount,
	                                                  likesCount,
	                                                  viewsCount,
	                                                  postTime,
	                                                  className
                                                  }) => {
	return (
		<div className={cn('bg-secondary rounded-md mb-4 p-4 hover:bg-secondary/50', className)}>
			<Link href={String(postUrl)}>
				<PostHeader authorAvatar={String(authorAvatar)} authorUrl={authorUrl} authorName={authorName}
				            categoryName={categoryName} categoryUrl={categoryUrl} postTime={postTime} />
				<PostBody postTitle={postTitle} postContent={postContent} postImage={postImage} maxLength={300} />
				<PostFooter commentsCount={commentsCount} bookmarksCount={bookmarksCount} likesCount={likesCount}
				            viewsCount={viewsCount} className='mt-4' />
				{endAdornment}
			</Link>
		</div>
	)
}
