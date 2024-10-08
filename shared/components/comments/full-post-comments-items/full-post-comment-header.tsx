import { ProfileAvatar } from '@/shared/components'
import { ActionTooltip } from '@/shared/components/action-tooltip'
import { cn } from '@/shared/lib/utils'
import { User } from '@prisma/client'
import { Crown, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface CommentHeaderProps {
	author: User
	publicationDate?: string
	className?: string
}

const roleIconMap = {
	USER: null,
	ADMIN: <ShieldCheck className='h-4 w-4 text-indigo-500 ml-2' />,
	OWNER: <Crown className='h-4 w-4  text-rose-500 ml-2' />
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
					<ProfileAvatar avatarImage={String(author.profile_picture)} />
				</Link>
				<div className='ml-2'>
					<div className='flex items-center'>
						<Link className='hover:text-a-color-hover' href={`/u/${author.id}`}>{author.fullName}</Link>
						<ActionTooltip label={author.role}>
							{roleIconMap[author.role]}
						</ActionTooltip>
					</div>
					<p className='text-sm'>{publicationDate}</p>
				</div>
			
			</div>
		</div>
	)
}
