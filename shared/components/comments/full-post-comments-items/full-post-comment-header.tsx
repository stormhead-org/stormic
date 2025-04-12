import type { User } from '@/payload-types'
import { ProfileAvatar } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { Crown, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface CommentHeaderProps {
	author: User
	publicationDate?: string
	className?: string
}

const roleIconMap = {
	moderator: null,
	everyone: null,
	admin: <ShieldCheck className='h-4 w-4 text-indigo-500 ml-2' />,
	owner: <Crown className='h-4 w-4  text-rose-500 ml-2' />
}

export const FullPostCommentHeader: React.FC<CommentHeaderProps> = ({
	author,
	publicationDate,
	className
}) => {
	
	const avatarImageUrl =
		typeof author.avatar === 'object'
			? getMediaUrl(author.avatar, '/logo.png')
			: '/logo.png'
	
	return (
		<div className={cn('flex justify-between w-full', className)}>
			<div className='flex items-center'>
				<Link href={`/u/${author.id}`}>
					<ProfileAvatar avatarImage={avatarImageUrl} />
				</Link>
				<div className='ml-2'>
					<div className='flex items-center'>
						<Link className='hover:text-a-color-hover' href={`/u/${author.id}`}>
							{author.name}
						</Link>
						{/* <ActionTooltip label={author?.userRoles?.[0]?.roleType && author.userRoles[0].roleType}>
							{roleIconMap[author.userRoles.roleType]}
						</ActionTooltip> */}
					</div>
					<p className='text-sm'>{publicationDate}</p>
				</div>
			</div>
		</div>
	)
}
