import { Title } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	postTitle: string
	postContent: string
	postImage?: string | null
	className?: string
	maxLength: number // Максимальная длина текста для обрезки по символам
}

const truncateText = (text: string, maxLength: number | undefined) => {
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
}

export const PostBody: React.FC<Props> = ({
	                                          postTitle,
	                                          postContent,
	                                          postImage,
	                                          className,
	                                          maxLength
                                          }) => {
	
	const truncatedContent = truncateText(postContent, maxLength)
	
	return (
		<div className={cn('', className)}>
			<Title text={postTitle} size='sm' className='font-extrabold my-2' />
			<p>{truncatedContent}</p>
			{postImage ? (
				<img className='rounded-md mt-4 object-cover h-80 w-full' src={String(postImage)} alt={postTitle} />
			) : null}
		</div>
	)
}
