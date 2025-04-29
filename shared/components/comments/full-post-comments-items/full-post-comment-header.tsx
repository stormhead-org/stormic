import type { User } from '@/payload-types'
import { ProfileAvatar } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { Crown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ActionTooltip } from '../../action-tooltip'

export interface CommentHeaderProps {
	author: User
	roleIconMap?: ('hostOwner' | 'communityOwner')[]
	publicationDate?: string
	className?: string
}

const roleIconMapConfig = {
	hostOwner: {
		icon: <Crown className='h-4 w-4 text-rose-500 ml-2' />,
		label: 'Владелец платформы'
	},
	communityOwner: {
		icon: <Crown className='h-4 w-4 text-indigo-500 ml-2' />,
		label: 'Владелец сообщества'
	}
}

export const FullPostCommentHeader: React.FC<CommentHeaderProps> = ({
	author,
	roleIconMap,
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
						<Link
							className='text-foreground hover:text-foreground font-bold'
							href={`/u/${author.id}`}
						>
							{author.name}
						</Link>
						{roleIconMap &&
							roleIconMap.length > 0 &&
							roleIconMap.map(role => (
								<ActionTooltip key={role} label={roleIconMapConfig[role].label}>
									{roleIconMapConfig[role].icon}
								</ActionTooltip>
							))}
					</div>
					<p className='text-sm text-foreground'>{publicationDate}</p>
				</div>
			</div>
		</div>
	)
}
