import { useCommentLikesStore } from '@/shared/stores/commentLikesStore'
import { Heart } from 'lucide-react'
import React, { useEffect } from 'react'

interface LikeButtonProps {
	commentId: number;
}

export const CommentLikeButton: React.FC<LikeButtonProps> = ({ commentId }) => {
	const { likesCount, hasLiked, toggleLike, initialize } = useCommentLikesStore(state => ({
		likesCount: state.likesCount[commentId] || 0, // Используем объект для хранения лайков по commentId
		hasLiked: state.hasLiked[commentId] || false,
		toggleLike: state.toggleLike,
		initialize: state.initialize
	}))
	
	useEffect(() => {
		initialize(commentId)
	}, [commentId, initialize])
	
	const handleLike = async () => {
		await toggleLike(commentId)
	}
	
	return (
		<button onClick={handleLike} className='like-button focus:outline-none  mr-4'>
			<div className='flex group items-center cursor-pointer'>
				{hasLiked ? (
					<>
						<Heart className='bg-blue-800/20 text-blue-700 rounded-full mr-1 w-7 h-7 p-1' />
						<span className='text-blue-700 font-bold'>
									{likesCount}
								</span>
					</>
				) : (
					<>
						<Heart
							className='group-hover:bg-blue-800/20 group-hover:text-blue-700 rounded-full mr-1 w-7 h-7 p-1' />
						<span className='group-hover:text-blue-700 font-bold'>
									{likesCount}
						</span>
					</>
				)}
			</div>
		</button>
	)
}
