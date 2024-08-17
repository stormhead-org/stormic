import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	userBio?: string
	userSubscribes: number
	userSub: number
	className?: string
}

export const ProfileBody: React.FC<Props> = ({
	                                             userBio,
	                                             userSubscribes,
	                                             userSub,
	                                             className
                                             }) => {
	return (
		<div className={cn('mx-6', className)}>
			<p className='text-md mt-2'>{userBio}</p>
			<div className='flex flex-1 items-center mt-2'>
				<p className='text-md'>{userSubscribes} подписчиков</p>
				<p className='ml-4 text-md'>{userSub} подписки</p>
			</div>
			<div className='flex mt-2'>
				<Button
					variant='secondary'
					className='h-10 w-26 text-md font-bold mt-auto hover:border-blue-600 border-b-4 rounded-none px-0'
					type='button'
					// onClick={() => router.push('/write')}
				>
					Посты
				</Button>
				<Button
					variant='secondary'
					className='h-10 w-26 text-md font-bold mt-auto hover:border-blue-600 border-b-4 ml-8 rounded-none px-0'
					type='button'
					// onClick={() => router.push('/write')}
				>
					Комментарии
				</Button>
			</div>
		</div>
	)
}
