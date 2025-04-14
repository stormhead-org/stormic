import { ProfileAvatar } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'

interface CommentHeaderProps {
	postTitle: string
	maxLength?: number
	authorName: string
	authorAvatar?: string
	authorUrl: string
	postUrl?: string
	publicationDate?: string
	className?: string
}

const truncateText = (
	text: string | undefined,
	maxLength: number | undefined
) => {
	if (!text) return '' // Возвращаем пустую строку, если text undefined или пустой
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
}

export const CommentHeader: React.FC<CommentHeaderProps> = ({
	postTitle,
	maxLength,
	authorName,
	authorAvatar,
	authorUrl,
	postUrl,
	publicationDate,
	className
}) => {
	const truncatedContent = truncateText(postTitle, maxLength)

	return (
		<div className={cn('flex justify-between w-full', className)}>
			<div className='flex items-center'>
				<Link href={authorUrl}>
					<ProfileAvatar avatarImage={authorAvatar || ''} />
				</Link>
				<div className='ml-2'>
					<Link
						className='text-black dark:text-white font-bold'
						href={authorUrl}
					>
						{authorName}
					</Link>
					<br />
					{postUrl ? (
						<Link className='text-sm text-black dark:text-white' href={postUrl}>
							{truncatedContent}
						</Link>
					) : (
						<p className='text-sm'>{publicationDate}</p>
					)}
				</div>
			</div>
		</div>
	)
}
