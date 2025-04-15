'use client'

import { Community, Post, User } from '@/payload-types'
import { PostBody } from '@/shared/components/posts/post-items/post-body'
import { PostFooter } from '@/shared/components/posts/post-items/post-footer'
import { PostHeader } from '@/shared/components/posts/post-items/post-header'
import { Permissions } from '@/shared/lib/permissions' // Импортируем тип Permissions
import { cn } from '@/shared/lib/utils'
import { usePostLikesStore } from '@/shared/stores/post-likes-store'
import { createVisibilityObserver } from '@/shared/utils/api/posts/visibility-observer'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { OutputData } from '@editorjs/editorjs'
import { useEffect, useRef } from 'react'
import { useSession } from '../../../providers/items/SessionProvider'

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
	}, [post.id])

	const heroImageUrl =
		typeof post.heroImage === 'object' ? getMediaUrl(post.heroImage, '') : ''

	return (
		<div
			className={cn(
				'bg-secondary rounded-md mt-4 p-4 hover:bg-primary/5',
				className
			)}
		>
			<div ref={ref} data-post-id={post.id} className='post'>
				<PostHeader
					post={post}
					communities={communities}
					currentUser={currentUser}
					permissions={permissions}
				/>
				<PostBody
					postTitle={post.title}
					postContent={post.content as unknown as OutputData}
					heroImage={heroImageUrl}
					maxLength={300}
					postUrl={`/p/${post.id}`}
				/>
				{!relatedPost ? (
					<PostFooter
						postId={Number(post.id)}
						commentsCount={commentsCount}
						views={post.views}
						className='mt-4'
					/>
				) : null}
			</div>
		</div>
	)
}
