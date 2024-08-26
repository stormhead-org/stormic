'use client'

import { ProfileAvatar } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { GripHorizontal } from 'lucide-react'
import React from 'react'

interface Props {
	profileBanner?: string
	profileAvatar?: string
	profileName: string
	profileRep?: number
	hasUser: boolean
	className?: string
}

export const ProfileHeader: React.FC<Props> = ({
	                                               profileBanner,
	                                               profileAvatar,
	                                               profileName,
	                                               profileRep,
	                                               hasUser,
	                                               className
                                               }) => {
	
	return (
		<div className={cn('', className)}>
			<img
				className='rounded-t-md object-cover object-center w-full h-[120px]'
				src={profileBanner}
				alt='Profile Banner'
			/>
			<div className='-mt-10 mx-6'>
				<div className='flex w-full justify-between mb-2'>
					<ProfileAvatar className='w-24 h-24' avatarImage={String(profileAvatar)} avatarSize={Number(92)} />
					<div className='flex items-center'>
						<Button
							variant='secondary'
							className='h-6 w-26 text-sm font-bold bg-white dark:bg-slate-700 hover:dark:bg-slate-900/50 mt-auto mb-[2px]'
							type='button'
							// onClick={() => router.push('/write')}
						>
							Подписаться
						</Button>
						<p className='flex items-center hover:text-blue-600 font-bold cursor-pointer mt-auto'>
							<GripHorizontal className='hover:bg-blue-600/20 rounded-full ml-2 w-7 h-7 p-1' />
						</p>
					</div>
				</div>
				<span className='font-bold text-2xl'> {profileName} </span>
				{hasUser &&
					<>
						<span className='text-md text-green-500 font-bold'>+{profileRep}</span>
					</>
				}
			</div>
		</div>
	)
}
