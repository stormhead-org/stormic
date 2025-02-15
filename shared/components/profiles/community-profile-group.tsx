'use client'

import { Community, Post } from '@/payload-types'
import { ProfileItem } from '@/shared/components/profiles/community-profiles-items/profile-item'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { CommunityProfilePostGroup } from '../posts/community-profile-post-group'

interface Props {
	posts: Post[]
	community: Community
	className?: string
}

export const CommunityProfileGroup: React.FC<Props> = ({
	posts,
	community,
	className,
}) => {
	return (
		<div className={cn('', className)}>
			<ProfileItem data={community} hasUser={false} />
			<CommunityProfilePostGroup data={posts} className='mt-1' />
		</div>
	)
}
