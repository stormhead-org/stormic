'use client'

import { Post } from '@/payload-types'
import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { FeedToggle } from '@/shared/components/ui/feed-toggle'
// import { useUserPosts } from '@/shared/hooks/use-user-post'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	data: Post[]
	className?: string
}

export const UserProfilePostGroup: React.FC<Props> = ({ className, data }) => {
	return (
		<div className={cn('', className)}>
			<div className='ml-6 my-2'>
				<FeedToggle />
			</div>
			<PostForm
				limit={5}
				post={data}
				// loading={loading}
			/>
		</div>
	)
}
