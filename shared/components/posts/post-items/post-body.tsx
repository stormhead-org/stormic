import { Title } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'

interface Props {
	postTitle: string
	postContent: string
	postImage?: string | null
	postUrl: string
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
	                                          postUrl,
	                                          className,
	                                          maxLength
                                          }) => {
	
	const truncatedContent = truncateText(postContent, maxLength)
	
	return (
		<div className={cn('', className)}>
			<Link href={postUrl}>
				<Title text={postTitle} size='sm' className='font-extrabold my-2' />
				<p>{truncatedContent}</p>
				{postImage ? (
					<img className='rounded-md mt-4 object-cover h-80 w-full' src={String(postImage)} alt={postTitle} />
				) : null}
			</Link>
		</div>
	)
}
