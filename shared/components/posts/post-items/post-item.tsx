'use client'

import { Community, Post, User } from '@/payload-types'
import { PostBody } from '@/shared/components/posts/post-items/post-body'
import { PostFooter } from '@/shared/components/posts/post-items/post-footer'
import { PostHeader } from '@/shared/components/posts/post-items/post-header'
import { Permissions } from '@/shared/lib/permissions' // Импортируем тип Permissions
import { cn } from '@/shared/lib/utils'
import { useSession } from '../../../providers/items/SessionProvider'
import { usePostLikesStore } from '@/shared/stores/post-likes-store'
import { OutputData } from '@editorjs/editorjs'

export const PostItem: React.FC<{
	post: Post
	communities: Community[]
	permissions: Permissions | null
	relatedPost?: boolean
	className?: string
}> = ({ post, communities, permissions, relatedPost = false, className }) => {
	const session = useSession()
	const currentUser = session && (session.user as User)
	const commentsCount = usePostLikesStore(
		state => state.commentsCount[post.id] || 0
	)

	return (
		<div
			className={cn(
				'bg-secondary rounded-md mt-4 p-4 hover:bg-primary/5',
				className
			)}
		>
			<div data-post-id={post.id} className='post'>
				<PostHeader
					post={post}
					communities={communities}
					currentUser={currentUser}
					permissions={permissions}
				/>
				<PostBody
					postTitle={post.title}
					postContent={post.content as unknown as OutputData}
					heroImage={String(
						'heroImage' in post &&
							typeof post.heroImage === 'object' &&
							post.heroImage !== null
							? post.heroImage.url
							: ''
					)}
					maxLength={300}
					postUrl={`/p/${post.id}`}
				/>
				{!relatedPost ? (
					<PostFooter
						postId={Number(post.id)}
						commentsCount={commentsCount}
						className='mt-4'
					/>
				) : null}
			</div>
		</div>
	)
}
