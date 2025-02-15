'use client'

import { Post, User } from '@/payload-types'
import { UserProfilePostGroup } from '@/shared/components/posts/user-profile-post-group'
import { ProfileItem } from '@/shared/components/profiles/community-profiles-items/profile-item'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	posts: Post[]
	user: User
	className?: string
}

export const UserProfileGroup: React.FC<Props> = ({
	posts,
	user,
	className,
}) => {
	return (
		<div className={cn('', className)}>
			<ProfileItem data={user} hasUser={true} />
			<UserProfilePostGroup data={posts} className='mt-1' />
		</div>
	)
}
