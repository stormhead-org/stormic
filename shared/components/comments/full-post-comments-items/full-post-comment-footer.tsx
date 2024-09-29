import { CommentLikeButton } from '@/shared/components/comment-like-button'
import { CommentInputAnswerForm } from '@/shared/components/comments/comment-input-items/comment-input-answer-form'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { CircleX, Ellipsis, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

interface PostFooterProps {
	postId?: number
	commentId: number
	onClickDeleteValue?: () => void
	onCommentAdded?: () => void;
	hasMe?: boolean
	className?: string
}

export const FullPostCommentFooter: React.FC<PostFooterProps> = ({
	                                                                 postId,
	                                                                 commentId,
	                                                                 onClickDeleteValue,
	                                                                 onCommentAdded,
	                                                                 hasMe,
	                                                                 className
                                                                 }) => {
	
	const { formatMessage } = useIntl()
	const [isReplying, setIsReplying] = useState(false);
	
	return (
		<div className={cn('', className)}>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<CommentLikeButton commentId={commentId} />
					<Button
						variant='blue'
						className='h-6 text-sm font-bold p-0 -mb-1 border-b-4 border-transparent bg-transparent hover:border-blue-700 hover:bg-transparent rounded-none text-primary'
						type='button'
						onClick={() => setIsReplying((prev) => !prev)}
					>
						{formatMessage({ id: 'commentFooter.commentReplay' })}
					</Button>
				</div>
				<div className='flex items-center justify-end'>
					{!hasMe ? null : (
						<div className='flex group cursor-pointer items-center'>
							<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
								<CircleX
									className='group-hover:bg-blue-800/20 rounded-full w-7 h-7 p-1'
									onClick={onClickDeleteValue}
								/>
							</p>
						</div>
					)}
					<div className='flex group cursor-pointer items-center'>
						<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
							<Ellipsis className='group-hover:bg-blue-800/20 rounded-full w-7 h-7 p-1' />
						</p>
					</div>
				</div>
			</div>
			{isReplying && (
				<CommentInputAnswerForm
					postId={postId}
					parentCommentId={commentId}
					onCommentAdded={onCommentAdded}
				/>
			)}
		</div>
	)
}
