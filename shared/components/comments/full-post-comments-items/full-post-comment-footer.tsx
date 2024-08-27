import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { Ellipsis, Heart } from 'lucide-react'
import React from 'react'

interface PostFooterProps {
	likesCount: number
	className?: string
}

export const FullPostCommentFooter: React.FC<PostFooterProps> = ({
	                                                                 likesCount,
	                                                                 className
                                                                 }) => {
	
	
	return (
		<div className={cn('flex items-center justify-between', className)}>
			<div className='flex items-center'>
				<div className='group mr-4 cursor-pointer'>
					<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
						<Heart className='group-hover:bg-blue-800/20 rounded-full mr-1 w-7 h-7 p-1' /> {likesCount}
					</p>
				</div>
				<Button
					variant='blue'
					className='h-6 text-sm font-bold p-0 -mb-1 border-b-4 border-transparent bg-transparent hover:border-blue-700 hover:bg-transparent rounded-none text-primary'
					type='button'
					// onClick={() => router.push('/write')}
				>
					Ответить
				</Button>
			</div>
			<div className='flex group cursor-pointer items-center'>
				<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
					<Ellipsis className='group-hover:bg-blue-800/20 rounded-full mr-1 w-7 h-7 p-1' />
				</p>
			</div>
		</div>
	)
}
