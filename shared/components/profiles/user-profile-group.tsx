'use client'

import { User } from '@/payload-types'
import { ProfileItem } from '@/shared/components/profiles/community-profiles-items/profile-item'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	// posts: Post[]
	user: User
	permissions: Permissions | null
	className?: string
}

export const UserProfileGroup: React.FC<Props> = ({
	// posts,
	user,
	permissions,
	className
}) => {
	return (
		<div className={cn('', className)}>
			<ProfileItem data={user} permissions={permissions} hasUser={true} />
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
