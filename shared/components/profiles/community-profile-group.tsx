'use client'

import { Community, type Post } from '@/payload-types'
import { PostForm } from '@/shared/components/posts/post-items/post-form'
import { ProfileItem } from '@/shared/components/profiles/community-profiles-items/profile-item'
import { FeedToggle } from '@/shared/components/ui/feed-toggle'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	// posts: Post[]
	community: Community
	className?: string
}

export const CommunityProfileGroup: React.FC<Props> = ({
	// posts,
	community,
	className
}) => {
	return (
		<div className={cn('', className)}>
			<ProfileItem data={community} hasUser={false} />
			{/* <div className='ml-6 mb-2 mt-3'> */}
			{/* 	<FeedToggle /> */}
			{/* </div> */}
			{/* <PostForm */}
			{/* 	limit={5} */}
			{/* 	post={posts} */}
			{/* 	// loading={loading} */}
			{/* /> */}
		</div>
	)
}
