import { ProfileAvatar } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { GripHorizontal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface PostHeaderProps {
	authorName: string
	authorAvatar?: string
	authorUrl: string
	categoryName: string
	categoryUrl: string
	postTime: string
	className?: string
}

export const PostHeader: React.FC<PostHeaderProps> = ({
	                                                      authorName,
	                                                      authorAvatar,
	                                                      authorUrl,
	                                                      categoryName,
	                                                      categoryUrl,
	                                                      postTime,
	                                                      className
                                                      }) => {
	
	
	return (
		<div className={cn('flex justify-between w-full', className)}>
			<div className='flex items-center'>
				<Link className='' href={authorUrl}>
					<ProfileAvatar avatarImage={String(authorAvatar)} />
				</Link>
				<div className='ml-2'>
					
					<Link className='hover:text-primary/50' href={authorUrl}>{authorName}</Link>
					<br />
					<Link className='text-sm hover:text-primary/50' href={categoryUrl}>{categoryName}</Link>
					<span className='ml-2 text-sm'>{postTime}</span>
				</div>
			
			</div>
			<div className='flex items-center'>
				<Button
					variant='secondary'
					className='h-6 w-26 text-sm font-bold'
					type='button'
					// onClick={() => router.push('/write')}
				>
					Подписаться
				</Button>
				<div className='group'>
					<p className='flex p-1 items-center group-hover:text-blue-600 font-bold'>
						<GripHorizontal className='group-hover:bg-blue-600/20 rounded-full ml-2 w-7 h-7 p-1' />
					</p>
				</div>
			</div>
		</div>
	)
}
