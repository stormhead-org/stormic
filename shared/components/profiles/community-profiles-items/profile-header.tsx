'use client'

import { ProfileAvatar } from '@/shared/components'
import UserFollowButton from '@/shared/components/user-follow-button'
import { cn } from '@/shared/lib/utils'
import { GripHorizontal } from 'lucide-react'
import React from 'react'
// import { useIntl } from 'react-intl'
import CommunityFollowButton from '../../community-follow-button'

interface Props {
	userId: number
	communityId: number
	profileBanner?: string | null | undefined
	profileAvatar?: string | null | undefined
	profileName: string | undefined | null
	profileRep?: number
	hasUser: boolean
	className?: string
}

export const ProfileHeader: React.FC<Props> = ({
	userId,
	communityId,
	profileBanner,
	profileAvatar,
	profileName,
	profileRep,
	hasUser,
	className
}) => {
	// const { formatMessage } = useIntl()
	return (
		<div className={cn('', className)}>
			<img
				className='rounded-t-md object-cover object-center w-full h-[120px]'
				src={profileBanner || ''}
				alt='Profile Banner'
			/>
			<div className='-mt-10 mx-6'>
				<div className='flex w-full justify-between mb-2'>
					<ProfileAvatar
						className='w-24 h-24 border-none bg-secondary hover:bg-secondary'
						avatarImage={String(profileAvatar)}
						avatarSize={Number(92)}
					/>
					<div className='flex items-center'>
						<div className='mt-16'>
							{hasUser ? (
								<UserFollowButton userId={userId} />
							) : (
								<CommunityFollowButton communityId={communityId} />
							)}
						</div>
						<p className='flex items-center hover:text-blue-700 font-bold cursor-pointer mt-auto'>
							<GripHorizontal className='hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1' />
						</p>
					</div>
				</div>
				<span className='font-bold text-2xl'> {profileName} </span>
				{hasUser && (
					<>
						<span className='text-md text-green-500 font-bold'>
							+{profileRep}
						</span>
					</>
				)}
			</div>
		</div>
	)
}
