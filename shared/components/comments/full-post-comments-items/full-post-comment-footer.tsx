'use client'

import { CommentLikeButton } from '@/shared/components/comment-like-button'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { Ellipsis } from 'lucide-react'
import React from 'react'
import { useIntl } from 'react-intl'

interface PostFooterProps {
	commentId: number
	className?: string
}

export const FullPostCommentFooter: React.FC<PostFooterProps> = ({
	                                                                 commentId,
	                                                                 className
                                                                 }) => {
	const { formatMessage } = useIntl()
	return (
		<div className={cn('flex items-center justify-between', className)}>
			<div className='flex items-center'>
				<CommentLikeButton commentId={commentId} />
				<Button
					variant='blue'
					className='h-6 text-sm font-bold p-0 -mb-1 border-b-4 border-transparent bg-transparent hover:border-blue-700 hover:bg-transparent rounded-none text-primary'
					type='button'
					// onClick={() => router.push('/write')}
				>
					{formatMessage({ id: 'commentFooter.commentReplay' })}
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
