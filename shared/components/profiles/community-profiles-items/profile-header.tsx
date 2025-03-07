'use client'

import { ProfileAvatar } from '@/shared/components'
import UserFollowButton from '@/shared/components/user-follow-button'
import { cn } from '@/shared/lib/utils'
import React from 'react'
// import { useIntl } from 'react-intl'
import { Community, User } from '@/payload-types'
import { GripHorizontal, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CommunityFollowButton from '../../community-follow-button'
import { SettingsProfileButton } from './settings-profile-button'

interface Props {
	data: User | Community
	currentUser: User
	hasUser: boolean
	className?: string
}

export const ProfileHeader: React.FC<Props> = ({
	data,
	currentUser,
	hasUser,
	className
}) => {
	// const { formatMessage } = useIntl()

	const router = useRouter()

	return (
		<div className={cn('', className)}>
			<img
				className='rounded-t-md object-cover object-center w-full h-[120px]'
				src={
					('banner' in data &&
						typeof data.banner === 'object' &&
						data.banner?.url &&
						data.banner.url) ||
					'/defaultBanner.jpg'
				}
				alt='Profile Banner'
			/>
			<div className='-mt-10 mx-6'>
				<div className='flex w-full justify-between mb-2'>
					<ProfileAvatar
						className='w-24 h-24 border-none bg-secondary hover:bg-secondary'
						avatarImage={
							'avatar' in data &&
							typeof data.avatar === 'object' &&
							data.avatar?.url
								? data.avatar.url
								: 'logo' in data &&
								  typeof data.logo === 'object' &&
								  data.logo?.url
								? data.logo.url
								: '/logo.png'
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

						{currentUser &&
							((hasUser && currentUser.id === (data as User).id) ||
								(!hasUser &&
									currentUser.id === (data as Community).owner?.id)) && (
								<SettingsProfileButton
									data={data}
									currentUser={currentUser}
									hasUser={hasUser}
									className='flex items-center hover:text-blue-700 font-bold cursor-pointer mt-auto'
								/>
							)}

						<div className='flex items-center hover:text-blue-700 font-bold cursor-pointer mt-auto'>
							{hasUser ? (
								<Settings
									className='hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1'
									onClick={() => router.push('/settings/profile')}
								/>
							) : (
								<Settings
									className='hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1'
									onClick={() =>
										router.push(
											`/settings/community/${(data as Community).id}/main`
										)
									}
								/>
							)}
						</div>

						<div className='flex items-center hover:text-blue-700 font-bold cursor-pointer mt-auto'>
							<GripHorizontal className='hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1' />
						</div>
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
