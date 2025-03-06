'use client'

import { User } from '@/payload-types'
import { ProfileItem } from '@/shared/components/profiles/community-profiles-items/profile-item'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	// posts: Post[]
	user: User
	currentUser: User
	className?: string
}

export const UserProfileGroup: React.FC<Props> = ({
	// posts,
	user,
	currentUser,
	className
}) => {
	return (
		<div className={cn('', className)}>
			<ProfileItem data={user} currentUser={currentUser} hasUser={true} />
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
