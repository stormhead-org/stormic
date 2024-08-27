import { cn } from '@/shared/lib/utils'
import { Bookmark, Eye, Heart, MessageCircle, Redo } from 'lucide-react'
import React from 'react'

export interface PostHeaderProps {
	postTags?: string[]
	commentsCount: number
	bookmarksCount: number
	likesCount: number
	viewsCount: number
	className?: string
}

export const PostFooter: React.FC<PostHeaderProps> = ({
	                                                      postTags,
	                                                      commentsCount,
	                                                      bookmarksCount,
	                                                      likesCount,
	                                                      viewsCount,
	                                                      className
                                                      }) => {
	
	
	return (
		<div className={cn('', className)}>
			{postTags && postTags.length > 0 ? (
				<p className='flex flex-wrap gap-2'>
					{postTags.map((tag, index) => (
						<span key={index} className='mr-2 pm-1 text-sm font-bold text-blue-700 cursor-default'>
							#{tag}
						</span>
					))}
				</p>
			) : null}
			<div className='flex items-center justify-between mt-3'>
				<div className='flex items-center'>
					<div className='group mr-4 cursor-pointer'>
						<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
							<Heart className='group-hover:bg-blue-800/20 rounded-full mr-1 w-7 h-7 p-1' /> {likesCount}
						</p>
					</div>
					<div className='group mr-4 cursor-pointer'>
						<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
							<MessageCircle className='group-hover:bg-blue-800/20 rounded-full mr-1 w-7 h-7 p-1' /> {commentsCount}
						</p>
					</div>
					<div className='group mr-4 cursor-pointer'>
						<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
							<Bookmark className='group-hover:bg-blue-800/20 rounded-full mr-1 w-7 h-7 p-1' /> {bookmarksCount}
						</p>
					</div>
					<div className='group cursor-pointer'>
						<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
							<Redo className='group-hover:bg-blue-800/20 rounded-full mr-1 w-7 h-7 p-1' />
						</p>
					</div>
				</div>
				<div className='group cursor-pointer'>
					<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
						<Eye className='group-hover:bg-blue-800/20 rounded-full mr-1 w-7 h-7 p-1' /> {viewsCount}
					</p>
				</div>
			</div>
		
		</div>
	)
}
