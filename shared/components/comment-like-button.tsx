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
		<button onClick={handleLike} className='like-button focus:outline-none'>
			<div className='flex items-center'>
				<div className='group mr-4 cursor-pointer'>
					<div className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
						{hasLiked ? (
							<>
								<Heart className='bg-blue-800/20 text-blue-700 font-bold rounded-full mr-1 w-7 h-7 p-1' />
								<span className='text-blue-700'>
									{likesCount}
								</span>
							</>
						) : (
							<>
								<Heart className='hover:bg-blue-800/20 hover:text-blue-700 font-bold rounded-full mr-1 w-7 h-7 p-1' />
								<span className='hover:text-blue-700'>
									{likesCount}
								</span>
							</>
						)}
					</div>
				</div>
			</div>
		</button>
	)
}
