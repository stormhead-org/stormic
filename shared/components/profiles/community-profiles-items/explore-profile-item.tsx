'use client'

import type { Community, User } from '@/payload-types'
import { ProfileAvatar } from '@/shared/components'
import CommunityFollowButton from '@/shared/components/community-follow-button'
import UserFollowButton from '@/shared/components/user-follow-button'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { truncateText } from '@/shared/utils/textUtils'
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
								? getMediaUrl((data as User).avatar, '/logo.png')
								: getMediaUrl((data as Community).logo, '/logo.png')
						}
						className='hover:bg-transparent'
					/>
					<span>
						{hasUser
							? truncateText((data as User).name, 24)
							: truncateText((data as Community).title, 24)}
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
