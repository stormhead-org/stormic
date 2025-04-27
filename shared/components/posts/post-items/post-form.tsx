'use client'

import { Community, Post } from '@/payload-types'
import { PostItem } from '@/shared/components/posts/post-items/post-item'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Skeleton } from '../../ui/skeleton'

interface Props {
	post: Post[]
	communities: Community[]
	postPermissions: Record<number, Permissions | null>
	limit?: number
	loading?: boolean
	relatedPost?: boolean
	className?: string
}

export const PostForm: React.FC<Props> = ({
	post,
	communities,
	postPermissions,
	limit,
	loading,
	relatedPost,
	className
}) => {
	if (loading) {
		return (
			<div className={className}>
				{[...Array(limit)].map((_, index) => (
					<Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
				))}
			</div>
		)
	}

	return (
		<div className={cn('', className)}>
			{post.map(item => (
				<PostItem
					key={item.id}
					post={item}
					communities={communities}
					permissions={postPermissions[item.id]}
					relatedPost={relatedPost}
				/>
			))}
		</div>
	)
}
