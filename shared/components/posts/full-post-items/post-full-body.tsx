import { PostHero } from '@/modules/heros/PostHero'
import { Post } from '@/payload-types'
import { Title } from '@/shared/components'
import RichText from '@/shared/components/RichText'
import { cn } from '@/shared/lib/utils'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import React from 'react'

interface Props {
	postTitle: string
	postContent: SerializedEditorState
	postHero: Post
	className?: string
}

export const PostFullBody: React.FC<Props> = ({
	postTitle,
	postContent,
	postHero,
	className,
}) => {
	return (
		<div className={cn('', className)}>
			<Title text={postTitle} size='sm' className='font-extrabold my-2' />
			{PostHero ? <PostHero post={postHero} /> : null}
			<RichText
				className='max-w-[48rem] mx-auto mt-4'
				data={postContent}
				enableGutter={false}
			/>
		</div>
	)
}
