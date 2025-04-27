'use client'

import type { Community, User } from '@/payload-types'
import { ProfileAvatar } from '@/shared/components'
import CommunityFollowButton from '@/shared/components/community-follow-button'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export interface CategoryItemProps {
	community: Community
	currentUser?: User
	joinButton?: boolean
	className?: string
}

export const CommunitiesItem: React.FC<CategoryItemProps> = ({
	community,
	currentUser,
	joinButton = false,
	className
}) => {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<div className={cn('', className)}>
			<Button
				variant='blue'
				type='button'
				className={cn(
					'flex gap-2 justify-between w-full h-12 text-base font-medium bg-transparent hover:bg-secondary text-primary rounded-xl',
					pathname === `/c/${community.id}`
						? 'bg-secondary hover:bg-secondary'
						: ''
				)}
				onClick={() => router.push(`/c/${community.id}`)}
			>
				<span className='flex items-center gap-2'>
					<ProfileAvatar
						avatarImage={getMediaUrl(community.logo, '/logo.png')}
						className='hover:bg-transparent'
					/>
					<span>{community.title}</span>
				</span>

				{currentUser && joinButton && (
					<CommunityFollowButton communityId={community.id} />
				)}
			</Button>
		</div>
	)
}
