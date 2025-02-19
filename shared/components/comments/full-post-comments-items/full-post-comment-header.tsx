import type { User } from '@/payload-types'
import { ProfileAvatar } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { Crown, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ActionTooltip } from '../../action-tooltip'

export interface CommentHeaderProps {
	author: User
	publicationDate?: string
	className?: string
}

const roleIconMap = {
	everyone: null,
	moderator: null,
	admin: <ShieldCheck className='h-4 w-4 text-indigo-500 ml-2' />,
	owner: <Crown className='h-4 w-4  text-rose-500 ml-2' />
}

export const FullPostCommentHeader: React.FC<CommentHeaderProps> = ({
	author,
	publicationDate,
	className
}) => {
	return (
		<div className={cn('flex justify-between w-full', className)}>
			<div className='flex items-center'>
				<Link href={`/u/${author.id}`}>
					<ProfileAvatar
						avatarImage={
							'authorAvatar' in author &&
							typeof author.authorAvatar === 'object' &&
							author.authorAvatar !== null
								? (author.authorAvatar as { url: string }).url
								: ''
						}
					/>
				</Link>
				<div className='ml-2'>
					<div className='flex items-center'>
						<Link className='hover:text-a-color-hover' href={`/u/${author.id}`}>
							{author.name}
						</Link>
						{author.userRoles?.map(role => (
							<ActionTooltip key={role.roleType} label={role.roleType}>
								{roleIconMap[role.roleType]}
							</ActionTooltip>
						))}
					</div>
					<p className='text-sm'>{publicationDate}</p>
				</div>
			</div>
		</div>
	)
}
