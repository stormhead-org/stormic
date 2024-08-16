import { Title } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import React from 'react'

export interface PostItemProps {
	postTitle: string
	postContent: string
	postImage?: string | null
	className?: string
}

export const PostBody: React.FC<PostItemProps> = ({
	                                                  postTitle,
	                                                  postContent,
	                                                  postImage,
	                                                  className
                                                  }) => {
	return (
		<div className={cn('', className)}>
			<Title text={postTitle} size='sm' className='font-extrabold my-2' />
			<p className=''>{postContent}</p>
			<img className='rounded-md mt-4 object-cover h-80 w-full' src={String(postImage)} alt={postTitle} />
		</div>
	)
}
