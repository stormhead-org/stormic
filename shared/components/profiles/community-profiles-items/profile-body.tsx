import {
	ProfileCustomFieldForm
} from '@/shared/components/profiles/community-profiles-items/profile-custom-filed-group'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	profileDescription?: string
	profileFollowers: number
	profileFollowing?: number
	profileRegTime?: string
	userId?: string
	hasUser: boolean
	className?: string
}

export const ProfileBody: React.FC<Props> = ({
	                                             profileDescription,
	                                             profileFollowers,
	                                             profileFollowing,
	                                             profileRegTime,
	                                             userId,
	                                             hasUser,
	                                             className
                                             }) => {
	return (
		<div className={cn('mx-6', className)}>
			<p className='text-md mt-2'>{profileDescription}</p>
			{userId &&
				<div className='rounded-md bg-primary/5 p-4 mt-4'>
					<p className='text-md font-bold'>Присоединился:</p>
					<p className='text-md font-bold mt-1'>{profileRegTime} г.</p>
					<ProfileCustomFieldForm userId={userId} />
				</div>
			}
			
			<div className='flex flex-1 items-center mt-4'>
				<p className='text-md font-bold'>{profileFollowers} подписчиков</p>
				{hasUser && <p className='ml-4 text-md font-bold'>{profileFollowing} подписки</p>}
			</div>
			<div className='flex mt-2'>
				<Button
					variant='blue'
					className='h-10 w-26 text-md font-bold p-0 bg-transparent border-b-4 border-transparent hover:border-blue-700 hover:bg-transparent rounded-none text-primary'
					type='button'
					// onClick={() => router.push('/write')}
				>
					Посты
				</Button>
				{hasUser &&
					<>
						<Button
							variant='secondary'
							className='h-10 w-26 text-md font-bold p-0 bg-transparent border-b-4 border-transparent hover:border-blue-700 hover:bg-transparent ml-8 rounded-none text-primary'
							type='button'
							// onClick={() => router.push('/write')}
						>
							Комментарии
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
							Команда
						</Button>
					</>
				}
			</div>
		</div>
	)
}
