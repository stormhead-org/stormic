import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'

export interface CommentItemProps {
	content: string
	maxLength?: number // Максимальная длина текста для обрезки по символам
	postUrl?: string
	className?: string
}

const truncateText = (text: string, maxLength: number | undefined) => {
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
}

export const CommentBody: React.FC<CommentItemProps> = ({
	                                                        content,
	                                                        maxLength,
	                                                        postUrl,
	                                                        className
                                                        }) => {
	
	const truncatedContent = truncateText(content, maxLength)
	
	return (
		<>
			{postUrl ? (
				<Link
					className={cn('mt-2', className)}
					href={postUrl}
				>
					{maxLength ? (<p>{truncatedContent}</p>) : content}
				</Link>
			) : (
				<div
					className={cn('mt-2', className)}
				>
					{maxLength ? (<p>{truncatedContent}</p>) : content}
				</div>
			)
			}
		</>
	)
}
