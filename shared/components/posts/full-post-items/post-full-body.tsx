import { PostHero } from '@/modules/heros/PostHero'
import { Post } from '@/payload-types'
import { Title } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { OutputData } from '@editorjs/editorjs'
import React from 'react'
import RichText from '../../editorjs/render'

interface Props {
	postTitle: string
	postContent: OutputData | null
	postHero: Post
	className?: string
}

export const PostFullBody: React.FC<Props> = ({
	postTitle,
	postContent,
	postHero,
	className
}) => {
	return (
		<div className={cn('', className)}>
			<Title text={postTitle} size='sm' className='font-extrabold my-2' />
			{PostHero ? <PostHero post={postHero} /> : null}
			{/* <RichText
				className='max-w-[48rem] mx-auto mt-4'
				data={postContent}
				enableGutter={false}
			/> */}
			<RichText data={postContent} />
		</div>
	)
}
