import { Community, User } from '@/payload-types'
import { ProfileCustomFieldForm } from '@/shared/components/profiles/community-profiles-items/profile-custom-filed-group'
import { Button } from '@/shared/components/ui/button'
import { formatDateTime } from '@/shared/lib/formatDateTime'
import { cn } from '@/shared/lib/utils'
import { CommunityFollowersCounter } from '@/shared/stores/state-counters/community-followers-counter'
import { UserFollowersCounter } from '@/shared/stores/state-counters/user-followers-counter'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	data: User | Community
	hasUser: boolean
	className?: string
}

export const ProfileBody: React.FC<Props> = ({ data, hasUser, className }) => {
	// const { formatMessage } = useIntl()

	const description = hasUser
		? (data as User).userDescription
		: (data as Community).communityDescription

	return (
		<div className={cn('mx-6', className)}>
			<p className='text-md mt-2'>{description}</p>
			<div className='rounded-md bg-primary/5 p-4 mt-4'>
				<p className='text-md font-bold'>
					{/* {formatMessage({ id: 'profileBody.joined' })} */}
					{hasUser ? 'Присоединился' : 'Создано'}
				</p>
				<p className='text-md font-bold mt-1'>
					{formatDateTime(data.createdAt)} г.
				</p>
				<ProfileCustomFieldForm data={data} />
			</div>

			<div className='flex gap-1 items-center mt-4'>
				{hasUser ?
					<UserFollowersCounter userId={data.id} />
				: <CommunityFollowersCounter communityId={data.id} />
				}
				<p className='font-bold text-md'>
					{/* {formatMessage({ id: 'profileBody.followersCount' })} */}
					подписчиков
				</p>
				{hasUser && (
					<p className='ml-4 text-md font-bold'>
						{0}
						{/* {formatMessage({ id: 'profileBody.followingCount' })} */}{' '}
						подписки
					</p>
				)}
			</div>
			<div className='flex mt-2'>
				<Button
					variant='blue'
					className='h-10 w-26 text-md font-bold p-0 bg-transparent border-b-4 border-transparent hover:border-blue-700 hover:bg-transparent rounded-none text-primary'
					type='button'
					// onClick={() => router.push('/write')}
				>
					{/* {formatMessage({ id: 'profileBody.tabPosts' })} */}
					Посты
				</Button>
				{hasUser && (
					<>
						<Button
							variant='secondary'
							className='h-10 w-26 text-md font-bold p-0 bg-transparent border-b-4 border-transparent hover:border-blue-700 hover:bg-transparent ml-8 rounded-none text-primary'
							type='button'
							// onClick={() => router.push('/write')}
						>
							{/* {formatMessage({ id: 'profileBody.tabComments' })} */}
							Комментарии
						</Button>
					</>
				)}
				{!hasUser && (
					<>
						<Button
							variant='secondary'
							className='h-10 w-26 text-md font-bold p-0 bg-transparent border-b-4 border-transparent hover:border-blue-700 hover:bg-transparent ml-8 rounded-none text-primary'
							type='button'
							// onClick={() => router.push('/write')}
						>
							{/* {formatMessage({ id: 'profileBody.modalModTeam' })} */}
							Команда
						</Button>
					</>
				)}
			</div>
		</div>
	)
}
