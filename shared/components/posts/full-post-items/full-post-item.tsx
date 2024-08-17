import { PostFullBody } from '@/shared/components/posts/full-post-items/post-full-body'
import { PostFooter } from '@/shared/components/posts/post-items/post-footer'
import { PostHeader } from '@/shared/components/posts/post-items/post-header'
import { cn } from '@/shared/lib/utils'
import React from 'react'

export interface FullPostItemProps {
	postTitle: string
	postContent: string
	postImage?: string | null
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

export const FullPostItem: React.FC<FullPostItemProps> = ({
	                                                          postTitle,
	                                                          postContent,
	                                                          postImage,
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
		<div className={cn('bg-secondary rounded-md mb-4 p-4', className)}>
			<PostHeader authorAvatar={String(authorAvatar)} authorUrl={authorUrl} authorName={authorName}
			            categoryName={categoryName} categoryUrl={categoryUrl} postTime={postTime} />
			<PostFullBody className='cursor-default' postTitle={postTitle} postContent={postContent} postImage={postImage} />
			<PostFooter commentsCount={commentsCount} bookmarksCount={bookmarksCount} likesCount={likesCount}
			            viewsCount={viewsCount} className='mt-4' />
		</div>
	)
}
