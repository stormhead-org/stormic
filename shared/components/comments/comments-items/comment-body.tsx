import { cn } from '@/shared/lib/utils'
import React from 'react'

export interface CommentItemProps {
	content: string
	maxLength?: number // Максимальная длина текста для обрезки по символам
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
	                                                        className
                                                        }) => {
	
	const truncatedContent = truncateText(content, maxLength)
	
	return (
		<div className={cn('mt-2', className)}>
			{maxLength ? (<p>{truncatedContent}</p>) : content}
		</div>
	)
}
