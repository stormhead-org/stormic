import { ProfileAvatar } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
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
		<div className={cn('', className)}>
			<div className='flex flex-1 items-center'>
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
		</div>
	)
}
