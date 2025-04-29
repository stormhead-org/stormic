// import { BookmarkButton } from '@/shared/components/bookmark-button'
import { BookmarkButton } from '@/shared/components/bookmark-button'
import { PostLikeButton } from '@/shared/components/post-like-button'
import { cn } from '@/shared/lib/utils'
import { Eye, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface PostFooterProps {
	postId: number
	postTags?: string[]
	commentsCount: number
	views: number
	className?: string
}

export const PostFooter: React.FC<PostFooterProps> = ({
	postId,
	postTags,
	commentsCount,
	views,
	className
}) => {
	return (
		<div className={cn('', className)}>
			{postTags && postTags.length > 0 ? (
				<p className='flex flex-wrap gap-2'>
					{postTags.map((tag, index) => (
						<span
							key={index}
							className='mr-2 pm-1 text-sm font-bold text-theme cursor-default'
						>
							#{tag}
						</span>
					))}
				</p>
			) : null}
			<div className='flex items-center justify-between mt-3'>
				<div className='flex items-center'>
					<PostLikeButton postId={postId} />
					<Link
						href={`/p/${postId}`}
						className='text-primary group mr-4 cursor-pointer'
					>
						<p className='flex p-1 items-center group-hover:text-theme font-bold'>
							<MessageCircle className='group-hover:bg-theme-hover/20 rounded-xl mr-1 w-7 h-7 p-1' />{' '}
							{commentsCount}
						</p>
					</Link>
					<BookmarkButton postId={postId} />
					{/* <div className='group cursor-pointer'>
						<p className='flex p-1 items-center group-hover:text-theme font-bold'>
							<Redo className='group-hover:bg-blue-800/20 rounded-full mr-1 w-7 h-7 p-1' />
						</p>
					</div> */}
				</div>
				{/* <div className='group cursor-pointer'> */}
				{/* 	<p className='flex p-1 items-center group-hover:text-theme font-bold'> */}
				{/* 		<Eye className='group-hover:bg-blue-800/20 rounded-full mr-1 w-7 h-7 p-1' />{' '} */}
				{/* 		{views} */}
				{/* 	</p> */}
				{/* </div> */}
				<div className='cursor-default'>
					<p className='flex p-1 items-center font-bold'>
						<Eye className='mr-1 w-7 h-7 p-1' /> {views}
					</p>
				</div>
			</div>
		</div>
	)
}
