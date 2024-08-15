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
	                                                  likesCount,
	                                                  viewsCount,
	                                                  postTime,
	                                                  className
                                                  }) => {
	return (
		<div className={cn('bg-secondary rounded-md mb-4 p-2', className)}>
			<Link href={String(postUrl)}>
				<PostHeader authorAvatar={String(authorAvatar)} authorUrl={authorUrl} authorName={authorName}
				            categoryName={categoryName} categoryUrl={categoryUrl} postTime={postTime} />
				<p>{postContent}</p>
				<img src={String(postImage)} width={400} height={400} alt={postTitle} />
				<p>{likesCount}</p>
				<p>{viewsCount}</p>
				{endAdornment}
			</Link>
		</div>
	)
}
