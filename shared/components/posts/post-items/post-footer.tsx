import { cn } from '@/shared/lib/utils'
import { Bookmark, Eye, Heart, MessageCircle, Redo } from 'lucide-react'
import React from 'react'

export interface PostHeaderProps {
	commentsCount: number
	bookmarksCount: number
	likesCount: number
	viewsCount: number
	className?: string
}

export const PostFooter: React.FC<PostHeaderProps> = ({
	                                                      commentsCount,
	                                                      bookmarksCount,
	                                                      likesCount,
	                                                      viewsCount,
	                                                      className
                                                      }) => {
	
	
	return (
		<div className={cn('flex items-center justify-between', className)}>
			<div className='flex'>
				<div className='group mr-4 cursor-pointer'>
					<p className='flex p-1 items-center group-hover:text-blue-600 font-bold'>
						<Heart className='group-hover:bg-blue-600/20 rounded-full mr-1 w-7 h-7 p-1' /> {likesCount}
					</p>
				</div>
				<div className='group mr-4 cursor-pointer'>
					<p className='flex p-1 items-center group-hover:text-blue-600 font-bold'>
						<MessageCircle className='group-hover:bg-blue-600/20 rounded-full mr-1 w-7 h-7 p-1' /> {commentsCount}
					</p>
				</div>
				<div className='group mr-4 cursor-pointer'>
					<p className='flex p-1 items-center group-hover:text-blue-600 font-bold'>
						<Bookmark className='group-hover:bg-blue-600/20 rounded-full mr-1 w-7 h-7 p-1' /> {bookmarksCount}
					</p>
				</div>
				<div className='group cursor-pointer'>
					<p className='flex p-1 items-center group-hover:text-blue-600 font-bold'>
						<Redo className='group-hover:bg-blue-600/20 rounded-full mr-1 w-7 h-7 p-1' />
					</p>
				</div>
			</div>
			<div className='group cursor-pointer'>
				<p className='flex p-1 items-center group-hover:text-blue-600 font-bold'>
					<Eye className='group-hover:bg-blue-600/20 rounded-full mr-1 w-7 h-7 p-1' /> {viewsCount}
				</p>
			</div>
		</div>
	)
}
