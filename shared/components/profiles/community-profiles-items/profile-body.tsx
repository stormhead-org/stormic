import {
	ProfileCustomFieldForm
} from '@/shared/components/profiles/community-profiles-items/profile-custom-filed-group'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { CategoryFollowersCounter } from '@/shared/stores/state-counters/community-followers-counter'
import { UserFollowersCounter } from '@/shared/stores/state-counters/user-followers-counter'
import { useFollowStore } from '@/shared/stores/user-follow-store'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

interface Props {
	userId: number
	categoryId: number
	profileDescription?: string
	profileFollowers: number
	profileFollowing?: number
	profileRegTime?: string
	hasUser: boolean
	className?: string
}

export const ProfileBody: React.FC<Props> = ({
	                                             hasUser,
	                                             userId,
	                                             categoryId,
	                                             profileDescription,
	                                             profileFollowing,
	                                             profileRegTime,
	                                             className
                                             }) => {
	const { formatMessage } = useIntl()
	
	return (
		<div className={cn('mx-6', className)}>
			<p className='text-md mt-2'>{profileDescription}</p>
			{hasUser &&
				<div className='rounded-md bg-primary/5 p-4 mt-4'>
					<p className='text-md font-bold'>{formatMessage({ id: 'profileBody.joined' })}</p>
					<p className='text-md font-bold mt-1'>{profileRegTime} г.</p>
					<ProfileCustomFieldForm userId={String(userId)} />
				</div>
			}
			
			<div className='flex gap-1 items-center mt-4'>
				{hasUser ? <UserFollowersCounter userId={userId || 0} /> : <CategoryFollowersCounter categoryId={categoryId || 0} />}
				<p className='font-bold text-md'>
					{formatMessage({ id: 'profileBody.followersCount' })}
				</p>
				{hasUser && <p
					className='ml-4 text-md font-bold'>{profileFollowing} {formatMessage({ id: 'profileBody.followingCount' })}</p>}
			</div>
			<div className='flex mt-2'>
				<Button
					variant='blue'
					className='h-10 w-26 text-md font-bold p-0 bg-transparent border-b-4 border-transparent hover:border-blue-700 hover:bg-transparent rounded-none text-primary'
					type='button'
					// onClick={() => router.push('/write')}
				>
					{formatMessage({ id: 'profileBody.tabPosts' })}
				</Button>
				{hasUser &&
					<>
						<Button
							variant='secondary'
							className='h-10 w-26 text-md font-bold p-0 bg-transparent border-b-4 border-transparent hover:border-blue-700 hover:bg-transparent ml-8 rounded-none text-primary'
							type='button'
							// onClick={() => router.push('/write')}
						>
							{formatMessage({ id: 'profileBody.tabComments' })}
						</Button>
					</>
				}
				{!hasUser &&
					<>
						<Button
							variant='secondary'
							className='h-10 w-26 text-md font-bold p-0 bg-transparent border-b-4 border-transparent hover:border-blue-700 hover:bg-transparent ml-8 rounded-none text-primary'
							type='button'
							// onClick={() => router.push('/write')}
						>
							{formatMessage({ id: 'profileBody.modalModTeam' })}
						</Button>
					</>
				}
			</div>
		</div>
	)
}
