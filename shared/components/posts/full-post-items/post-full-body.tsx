import { Title } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	postTitle: string
	postContent: string
	postImage?: string | null
	className?: string
}

export const PostFullBody: React.FC<Props> = ({
	                                              postTitle,
	                                              postContent,
	                                              postImage,
	                                              className
                                              }) => {
	return (
		<div className={cn('', className)}>
			<Title text={postTitle} size='sm' className='font-extrabold my-2' />
			{postImage ? (
				<img className='rounded-md mt-4 object-cover h-80 w-full' src={String(postImage)} alt={postTitle} />
			) : null}
			<p className='mt-4'>{postContent}</p>
		</div>
	)
}
