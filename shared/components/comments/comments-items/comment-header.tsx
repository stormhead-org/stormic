import { ProfileAvatar } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { truncateText } from '@/shared/utils/textUtils'
import { Crown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ActionTooltip } from '../../action-tooltip'

interface CommentHeaderProps {
	postTitle: string
	authorName: string
	authorUrl: string
	roleIconMap?: ('hostOwner' | 'communityOwner')[]
	maxLength?: number
	authorAvatar?: string
	postUrl?: string
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

export const CommentHeader: React.FC<CommentHeaderProps> = ({
	postTitle,
	maxLength,
	authorName,
	authorAvatar,
	roleIconMap,
	authorUrl,
	postUrl,
	publicationDate,
	className
}) => {
	const truncatedContent = truncateText(postTitle, maxLength)

	return (
		<div className={cn('flex justify-between w-full', className)}>
			<div className='flex items-center'>
				<Link href={authorUrl} className='text-foreground'>
					<ProfileAvatar avatarImage={authorAvatar || ''} />
				</Link>
				<div className='ml-2'>
					<div className='flex items-center'>
						<Link
							className='text-foreground hover:text-foreground font-bold'
							href={authorUrl}
						>
							{authorName}
						</Link>
						{roleIconMap &&
							roleIconMap.length > 0 &&
							roleIconMap.map(role => (
								<ActionTooltip key={role} label={roleIconMapConfig[role].label}>
									{roleIconMapConfig[role].icon}
								</ActionTooltip>
							))}
					</div>

					{postUrl ? (
						<Link
							className='text-sm text-foreground hover:text-foreground'
							href={postUrl}
						>
							{truncatedContent}
						</Link>
					) : (
						<p className='text-sm text-foreground hover:text-foreground'>
							{publicationDate}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
