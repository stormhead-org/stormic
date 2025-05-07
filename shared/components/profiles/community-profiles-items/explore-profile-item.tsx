'use client'

import type { Community, User } from '@/payload-types'
import { ProfileAvatar } from '@/shared/components'
import CommunityFollowButton from '@/shared/components/community-follow-button'
import UserFollowButton from '@/shared/components/user-follow-button'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export interface Props {
	data: User | Community
	currentUser?: User
	hasUser?: boolean
	className?: string
}

export const ExploreProfileItem: React.FC<Props> = ({
	data,
	currentUser,
	hasUser,
	className
}) => {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<div className={cn('', className)}>
			<div
				className={cn(
					'flex items-center justify-between w-full h-12 text-base font-medium bg-transparent hover:bg-secondary text-primary rounded-xl cursor-pointer px-3',
					pathname === `/${hasUser ? 'u' : 'c'}/${data.id}`
						? 'bg-secondary hover:bg-secondary'
						: ''
				)}
			>
				<div
					onClick={() => router.push(`/${hasUser ? 'u' : 'c'}/${data.id}`)}
					className='flex items-center gap-2 w-full'
				>
					<ProfileAvatar
						avatarImage={
							hasUser
								? getMediaUrl((data as User).avatar, 'square', '/logo.png')
								: getMediaUrl((data as Community).logo, 'square', '/logo.png')
						}
						className='hover:bg-transparent'
					/>
					<span className='truncate max-w-[12ch] lg:max-w-[24ch]'>
						{hasUser ? (data as User).name : (data as Community).title}
					</span>
				</div>

				{currentUser &&
					(hasUser ? (
						currentUser.id !== data.id && <UserFollowButton userId={data.id} />
					) : (
						<CommunityFollowButton communityId={data.id} />
					))}
			</div>
		</div>
	)
}
