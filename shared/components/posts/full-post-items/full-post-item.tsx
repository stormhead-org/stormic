import { Post } from '@/payload-types'
import { PostFullBody } from '@/shared/components/posts/full-post-items/post-full-body'
import { PostFooter } from '@/shared/components/posts/post-items/post-footer'
import { PostHeader } from '@/shared/components/posts/post-items/post-header'
import { formatDateTime } from '@/shared/lib/formatDateTime'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { PostItem } from '../post-items/post-item'

interface FullPostItemProps {
	post: Post
	className?: string
}

export const FullPostItem: React.FC<FullPostItemProps> = ({
	post,
	className
}) => {
	return (
		<div className={cn('bg-secondary rounded-md mb-4 p-4', className)}>
			<PostHeader
				authorId={post.author?.id}
				authorUrl={`/u/${post.author?.id}` || '#'}
				authorName={post.author?.name || '#'}
				authorAvatar={post.author?.avatar?.url}
				categoryName={post.community?.title || '#'}
				categoryUrl={post.community ? `/c/${post.community.id}` : '#'}
				postTime={formatDateTime(post.publishedAt ? post.publishedAt : '#')}
			/>
			<PostFullBody
				className='cursor-default'
				postTitle={post.title}
				postContent={post.content}
				postHero={post}
			/>
			{post.relatedPost && (
				<PostItem
					post={post.relatedPost as Post}
					relatedPost={true}
					className={'mt-6'}
				/>
			)}
			<PostFooter
				postId={post.id}
				// postTags={postTags}
				// commentsCount={commentsCount}
				// viewsCount={viewsCount}
				className='mt-4'
			/>
		</div>
	)
}
