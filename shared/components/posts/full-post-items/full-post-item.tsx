import { Community, Post, User } from '@/payload-types'
import { PostFullBody } from '@/shared/components/posts/full-post-items/post-full-body'
import { PostFooter } from '@/shared/components/posts/post-items/post-footer'
import { PostHeader } from '@/shared/components/posts/post-items/post-header'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { OutputData } from '@editorjs/editorjs'
import React from 'react'
import { useSession } from '../../../providers/items/SessionProvider'
import { PostItem } from '../post-items/post-item'

interface FullPostItemProps {
	post: Post
	communities: Community[]
	permissions: Permissions | null
	commentsCount: number
	className?: string
}

export const FullPostItem: React.FC<FullPostItemProps> = ({
	post,
	communities,
	permissions,
	commentsCount,
	className
}) => {
	const session = useSession()
	const currentUser = session && (session.user as User)

	const heroImageUrl =
		typeof post.heroImage === 'object' ? getMediaUrl(post.heroImage, '') : ''

	return (
		<div className={cn('bg-secondary rounded-md mb-4 p-4', className)}>
			<PostHeader
				post={post}
				communities={communities}
				permissions={permissions}
				currentUser={currentUser}
			/>
			<PostFullBody
				className='cursor-default'
				postTitle={post.title}
				heroImage={heroImageUrl}
				postContent={post.content as unknown as OutputData}
			/>
			{post.relatedPost && (
				<PostItem
					post={post.relatedPost as Post}
					communities={communities}
					permissions={permissions}
					relatedPost={true}
					className={'mt-6'}
				/>
			)}
			<PostFooter
				postId={post.id}
				views={post.views}
				// postTags={postTags}
				commentsCount={commentsCount}
				className='mt-4'
			/>
		</div>
	)
}
