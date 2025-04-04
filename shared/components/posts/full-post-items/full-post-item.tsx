import { Community, Post, User } from '@/payload-types'
import { PostFullBody } from '@/shared/components/posts/full-post-items/post-full-body'
import { PostFooter } from '@/shared/components/posts/post-items/post-footer'
import { PostHeader } from '@/shared/components/posts/post-items/post-header'
import { cn } from '@/shared/lib/utils'
import { useSession } from '@/shared/providers/SessionProvider'
import { OutputData } from '@editorjs/editorjs'
import React from 'react'
import { PostItem } from '../post-items/post-item'

interface FullPostItemProps {
	post: Post
	communities: Community[]
	className?: string
}

export const FullPostItem: React.FC<FullPostItemProps> = ({
	post,
	communities,
	className
}) => {
	const session = useSession()
	const currentUser = session && (session.user as User)

	return (
		<div className={cn('bg-secondary rounded-md mb-4 p-4', className)}>
			<PostHeader
				post={post}
				communities={communities}
				currentUser={currentUser}
			/>
			<PostFullBody
				className='cursor-default'
				postTitle={post.title}
				heroImage={String(
					'heroImage' in post &&
						typeof post.heroImage === 'object' &&
						post.heroImage !== null
						? post.heroImage.url
						: ''
				)}
				postContent={post.content as unknown as OutputData}
			/>
			{post.relatedPost && (
				<PostItem
					post={post.relatedPost as Post}
					communities={communities}
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
