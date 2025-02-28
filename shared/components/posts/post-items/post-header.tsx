import { ProfileAvatar } from '@/shared/components'
// import { Button } from '@/shared/components/ui/button'
import UserFollowButton from '@/shared/components/user-follow-button'
import { cn } from '@/shared/lib/utils'
import { GripHorizontal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
// import { useIntl } from 'react-intl'

export interface PostHeaderProps {
	authorId: number
	authorName: string
	authorUrl: string
	authorAvatar: string
	categoryName: string
	categoryUrl: string
	postTime: string
	className?: string
}

export const PostHeader: React.FC<PostHeaderProps> = ({
	authorId,
	authorName,
	authorUrl,
	authorAvatar,
	categoryName,
	categoryUrl,
	postTime,
	className
}) => {
	// const { formatMessage } = useIntl()
	return (
		<div className={cn('flex justify-between w-full', className)}>
			<div className='flex items-center'>
				<Link className='' href={authorUrl}>
					<ProfileAvatar avatarImage={String(authorAvatar)} />
				</Link>
				<div className='ml-2'>
					<Link className='hover:text-a-color-hover' href={authorUrl}>
						{authorName}
					</Link>
					<br />
					<Link className='text-sm hover:text-a-color-hover' href={categoryUrl}>
						{categoryName}
					</Link>
					<span className='ml-2 text-sm cursor-default'>{postTime}</span>
				</div>
			</div>
			<div className='flex items-center'>
				<UserFollowButton userId={authorId} />
				<div className='group'>
					<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
						<GripHorizontal className='group-hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1' />
					</p>
				</div>
			</div>
		</div>
	)
}
