'use client'

import { Community, Post } from '@/payload-types'
import { FullPostItem } from '@/shared/components/posts/full-post-items/full-post-item'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Skeleton } from '../../ui/skeleton'

interface Props {
	post: Post
	communities: Community[]
	loading?: boolean
	className?: string
}

export const FullPostForm: React.FC<Props> = ({
	post,
	communities,
	loading,
	className
}) => {
	if (loading) {
		return (
			<div className={className}>
				<Skeleton className='h-6 mb-4 rounded-[8px]' />
			</div>
		)
	}

	return (
		<div className={cn('', className)}>
			<FullPostItem post={post} communities={communities} />
		</div>
	)
}
