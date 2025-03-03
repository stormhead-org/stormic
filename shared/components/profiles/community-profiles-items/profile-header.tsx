'use client'

import { ProfileAvatar } from '@/shared/components'
import UserFollowButton from '@/shared/components/user-follow-button'
import { cn } from '@/shared/lib/utils'
import React from 'react'
// import { useIntl } from 'react-intl'
import { Community, User } from '@/payload-types'
import CommunityFollowButton from '../../community-follow-button'
import { SettingsProfileButton } from './settings-profile-button'

interface Props {
	data: User | Community
	hasUser: boolean
	className?: string
}

export const ProfileHeader: React.FC<Props> = ({
	data,
	hasUser,
	className
}) => {
	// const { formatMessage } = useIntl()
	return (
		<div className={cn('', className)}>
			<img
				className='rounded-t-md object-cover object-center w-full h-[120px]'
				src={
					'userBanner' in data &&
					typeof data.userBanner === 'object' &&
					data.userBanner !== null
						? data.userBanner.url
						: 'communityBanner' in data &&
						  typeof data.communityBanner === 'object' &&
						  data.communityBanner !== null
						? data.communityBanner.url
						: undefined
				}
				alt='Profile Banner'
			/>
			<div className='-mt-10 mx-6'>
				<div className='flex w-full justify-between mb-2'>
					<ProfileAvatar
						className='w-24 h-24 border-none bg-secondary hover:bg-secondary'
						avatarImage={
							'userAvatar' in data &&
							typeof data.userAvatar === 'object' &&
							data.userAvatar !== null
								? data.userAvatar.url
								: 'communityLogo' in data &&
								  typeof data.communityLogo === 'object' &&
								  data.communityLogo !== null
								? data.communityLogo.url
								: undefined
						}
						avatarSize={Number(92)}
					/>
					<div className='flex items-center'>
						<div className='mt-16'>
							{hasUser ? (
								<UserFollowButton userId={data.id} />
							) : (
								<CommunityFollowButton communityId={data.id} />
							)}
						</div>
						<SettingsProfileButton
							data={data}
							hasUser={hasUser}
							className='flex items-center hover:text-blue-700 font-bold cursor-pointer mt-auto'
						/>
					</div>
				</div>
				<span className='font-bold text-2xl'>
					{' '}
					{'name' in data ? data.name : (data as Community).title || '#'}{' '}
				</span>
				{hasUser && (
					<>
						<span className='text-md text-green-500 font-bold'>+{0}</span>
					</>
				)}
			</div>
		</div>
	)
}
