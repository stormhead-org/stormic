import { ActionTooltip } from '@/shared/components/action-tooltip'
import { CommentLikeButton } from '@/shared/components/comment-like-button'
import { CommentInputAnswer } from '@/shared/components/comments/comment-input-items/comment-input-answer'
import { Button } from '@/shared/components/ui/button'
import { useModal } from '@/shared/hooks/use-modal-store'
import { cn } from '@/shared/lib/utils'
import { CircleX, Edit, Ellipsis } from 'lucide-react'
import React, { useState } from 'react'
// import { useIntl } from 'react-intl'

interface PostFooterProps {
	id: string
	postId?: number
	parentCommentAuthorName: string
	canDeleteMessage: boolean
	canEditMessage: boolean
	socketUrl: string
	socketQuery: Record<string, string>
	isEditing: boolean
	setIsEditing: (isEditing: boolean) => void;
	className?: string
}

export const FullPostCommentFooter: React.FC<PostFooterProps> = ({
	                                                                 id,
	                                                                 postId,
	                                                                 parentCommentAuthorName,
	                                                                 canDeleteMessage,
	                                                                 canEditMessage,
	                                                                 socketUrl,
	                                                                 socketQuery,
	                                                                 isEditing,
	                                                                 setIsEditing,
	                                                                 className
                                                                 }) => {
	const { onOpen } = useModal()
	// const { formatMessage } = useIntl()
	const [isReplying, setIsReplying] = useState(false)
	
	return (
		<div className={cn('', className)}>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<CommentLikeButton commentId={Number(id)} />
					<Button
						variant='blue'
						className='h-6 text-sm font-bold p-0 -mb-1 border-b-4 border-transparent bg-transparent hover:border-blue-700 hover:bg-transparent rounded-none text-primary'
						type='button'
						onClick={() => setIsReplying((prev) => !prev)}
					>
						{/* {formatMessage({ id: 'commentFooter.commentReplay' })} */}
						Ответить
					</Button>
				</div>
				<div className='flex items-center justify-end'>
					{canDeleteMessage && (
						<div className='flex items-center'>
							{canEditMessage && (
								<ActionTooltip label='Редактировать'>
									<div className='flex group cursor-pointer items-center'>
										<div
											className={cn('flex p-1 items-center group-hover:text-blue-700 font-bold', isEditing && 'text-blue-700')}>
											<Edit
												onClick={() => setIsEditing(true)}
												className={cn('group-hover:bg-blue-800/20 rounded-full w-7 h-7 p-1 cursor-pointer', isEditing && 'bg-blue-800/20')}
											/>
										</div>
									</div>
								</ActionTooltip>
							)}
							<ActionTooltip label='Удалить'>
								<div className='flex group cursor-pointer items-center'>
									<div className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
										<CircleX
											onClick={() =>
												onOpen('deleteComment', {
													apiUrl: `${socketUrl}/${id}`,
													query: socketQuery
												})
											}
											className='group-hover:bg-blue-800/20 rounded-full w-7 h-7 p-1'
										/>
									</div>
								</div>
							</ActionTooltip>
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
				<CommentInputAnswer
					apiUrl={'/api/socket/posts/comments'}
					query={{
						postId: postId,
						parentCommentId: id
					}}
					setIsReplying={setIsReplying}
					parentCommentAuthorName={parentCommentAuthorName} />
			)}
		</div>
	)
}
