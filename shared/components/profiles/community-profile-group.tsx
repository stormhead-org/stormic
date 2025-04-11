'use client'

import { Community, Post, User } from '@/payload-types'
import { ProfileItem } from '@/shared/components/profiles/community-profiles-items/profile-item'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { PostForm } from '../posts/post-items/post-form'

interface Props {
	posts: Post[]
	community: Community
	communities: Community[]
	currentUser?: User
	permissions: Permissions | null
	postPermissions: Record<number, Permissions | null>
	className?: string
}

export const CommunityProfileGroup: React.FC<Props> = ({
	posts,
	community,
	communities,
	currentUser,
	permissions,
	postPermissions,
	className
}) => {
	return (
		<div className={cn('', className)}>
			<ProfileItem
				data={community}
				currentUser={currentUser}
				permissions={permissions}
				hasUser={false}
			/>
			{/* <div className='ml-6 mb-2 mt-3'> */}
			{/* 	<FeedToggle /> */}
			{/* </div> */}
			<PostForm
				post={posts}
				communities={communities}
				postPermissions={postPermissions}
				className='mt-4'
			/>
		</div>
	)
}
