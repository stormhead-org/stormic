import { Title } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { OutputData } from '@editorjs/editorjs'
import React from 'react'
import RichText from '../../editorjs/render'

interface Props {
	postTitle: string
	postContent: OutputData | null
	heroImage?: string
	className?: string
}

export const PostFullBody: React.FC<Props> = ({
	postTitle,
	postContent,
	heroImage,
	className
}) => {
	return (
		<div className={cn('', className)}>
			<Title text={postTitle} size='sm' className='font-extrabold my-2' />
			{heroImage && (
				<img
					className='rounded-md mt-4 object-cover h-80 w-full'
					src={heroImage}
					alt={postTitle}
				/>
			)}
			<RichText data={postContent} className='mt-4' />
		</div>
	)
}
