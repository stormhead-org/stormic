import { ActionTooltip } from '@/shared/components/action-tooltip'
import { CommentLikeButton } from '@/shared/components/comment-like-button'
import { CommentInputAnswer } from '@/shared/components/comments/comment-input-items/comment-input-answer'
import { MobileCommentAnswerDrawer } from '@/shared/components/modals/mobile-comment-answer-drawer'
import { Button } from '@/shared/components/ui/button'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { useModal } from '@/shared/hooks/use-modal-store'
import { cn } from '@/shared/lib/utils'
import { CircleX, Edit } from 'lucide-react'
import React, { useState } from 'react'
// import { useIntl } from 'react-intl'

interface PostFooterProps {
	id: string
	postId?: number
	communityId?: number
	parentCommentAuthorName: string
	canDeleteMessage: boolean
	canEditMessage: boolean
	socketUrl: string
	socketQuery: Record<string, string>
	isEditing: boolean
	setIsEditing: (isEditing: boolean) => void
	className?: string
}

export const FullPostCommentFooter: React.FC<PostFooterProps> = ({
	id,
	postId,
	communityId,
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
	const isMobile = useIsMobile()

	return (
		<div className={cn('', className)}>
			<div className='flex items-center justify-between'>
				<div className='flex items-center'>
					<CommentLikeButton commentId={Number(id)} />
					<Button
						variant='blue'
						className='h-7 w-22 text-base font-bold rounded-xl text-foreground hover:text-background bg-transparent'
						type='button'
						onClick={() => setIsReplying(prev => !prev)}
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
											className={cn(
												'flex p-1 items-center group-hover:text-theme font-bold',
												isEditing && 'text-theme'
											)}
										>
											<Edit
												onClick={() => setIsEditing(true)}
												className={cn(
													'group-hover:bg-theme-hover/20 rounded-xl w-7 h-7 p-1 cursor-pointer',
													isEditing && 'bg-theme-hover/20'
												)}
											/>
										</div>
									</div>
								</ActionTooltip>
							)}
							<ActionTooltip label='Удалить'>
								<div className='flex group cursor-pointer items-center'>
									<div className='flex p-1 items-center group-hover:text-theme font-bold'>
										<CircleX
											onClick={() =>
												onOpen('deleteComment', {
													apiUrl: `${socketUrl}/${id}`,
													query: socketQuery
												})
											}
											className='group-hover:bg-theme-hover/20 rounded-xl w-7 h-7 p-1'
										/>
									</div>
								</div>
							</ActionTooltip>
						</div>
					)}
					{/* <div className='flex group cursor-pointer items-center'>
						<p className='flex p-1 items-center group-hover:text-theme font-bold'>
							<Ellipsis className='group-hover:bg-theme-hover/20 rounded-xl w-7 h-7 p-1' />
						</p>
					</div> */}
				</div>
			</div>
			{isReplying &&
				(!isMobile ? (
					<CommentInputAnswer
						apiUrl={'/api/socket/posts/comments'}
						query={{
							postId: postId,
							parentCommentId: id,
							communityId: communityId
						}}
						setIsReplying={setIsReplying}
						parentCommentAuthorName={parentCommentAuthorName}
					/>
				) : (
					<MobileCommentAnswerDrawer
						apiUrl={'/api/socket/posts/comments'}
						query={{
							postId: postId,
							parentCommentId: id,
							communityId: communityId
						}}
						setIsReplying={setIsReplying}
						parentCommentAuthorName={parentCommentAuthorName}
						open={isReplying}
						onClose={() => setIsReplying(false)}
					/>
				))}
		</div>
	)
}
