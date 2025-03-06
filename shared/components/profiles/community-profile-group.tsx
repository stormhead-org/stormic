'use client'

import { Community, User } from '@/payload-types'
import { ProfileItem } from '@/shared/components/profiles/community-profiles-items/profile-item'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	// posts: Post[]
	community: Community
	currentUser: User
	className?: string
}

export const CommunityProfileGroup: React.FC<Props> = ({
	// posts,
	community,
	currentUser,
	className
}) => {
	return (
		<div className={cn('', className)}>
			<ProfileItem data={community} currentUser={currentUser} hasUser={false} />
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
