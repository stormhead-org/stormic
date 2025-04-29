import {
	LikeStoreState,
	useCommentLikesStore
} from '@/shared/stores/comment-likes-store'
import { Heart } from 'lucide-react'
import React, { useEffect } from 'react'

interface LikeButtonProps {
	commentId: number
}

export const CommentLikeButton: React.FC<LikeButtonProps> = ({ commentId }) => {
	const likesCount = useCommentLikesStore(
		(state: LikeStoreState) => state.likesCount[commentId] || 0
	)
	const hasLiked = useCommentLikesStore(
		(state: LikeStoreState) => state.hasLiked[commentId] || false
	)
	const toggleLike = useCommentLikesStore(
		(state: LikeStoreState) => state.toggleLike
	)
	const initialize = useCommentLikesStore(
		(state: LikeStoreState) => state.initialize
	)

	useEffect(() => {
		initialize(commentId)
	}, [commentId, initialize])

	const handleLike = async () => {
		await toggleLike(commentId)
	}

	return (
		<button
			onClick={handleLike}
			className='like-button focus:outline-none mr-4'
		>
			<div className='flex group items-center cursor-pointer'>
				{hasLiked ? (
					<>
						<Heart className='bg-theme-hover/20 text-theme rounded-xl mr-1 w-7 h-7 p-1' />
						<span className='text-theme font-bold'>{likesCount}</span>
					</>
				) : (
					<>
						<Heart className='group-hover:bg-theme-hover/20 group-hover:text-theme rounded-xl mr-1 w-7 h-7 p-1' />
						<span className='group-hover:text-theme font-bold'>
							{likesCount}
						</span>
					</>
				)}
			</div>
		</button>
	)
}
