import { ProfileAvatar } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'

export interface CommentHeaderProps {
	postTitle: string
	maxLength?: number // Максимальная длина текста для обрезки по символам
	authorName: string
	authorAvatar?: string
	authorUrl: string
	publicationDate?: string
	className?: string
}

const truncateText = (text: string, maxLength: number | undefined) => {
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
	                                                            publicationDate,
	                                                            className
                                                            }) => {
	
	
	const truncatedContent = truncateText(postTitle, maxLength)
	
	return (
		<div className={cn('flex justify-between w-full', className)}>
			<div className='flex items-center'>
				<Link href={authorUrl}>
					<ProfileAvatar avatarImage={String(authorAvatar)} />
				</Link>
				<div className='ml-2'>
					
					<Link className='hover:text-a-color-hover' href={authorUrl}>{authorName}</Link>
					<br />
					{!publicationDate ? (
						<p className='text-sm hover:text-a-color-hover'>{truncatedContent}</p>
					) : (
						<p className='text-sm'>{publicationDate}</p>
					)}
				</div>
			
			</div>
		</div>
	)
}
