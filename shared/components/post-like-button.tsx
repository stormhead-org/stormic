import { usePostLikesStore } from '@/shared/stores/post-likes-store'
import { Heart } from 'lucide-react'
import React, { useEffect } from 'react'

interface LikeButtonProps {
	postId: number;
}

export const PostLikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
	const { likesCount, hasLiked, toggleLike, initialize } = usePostLikesStore(state => ({
		likesCount: state.likesCount[postId] || 0, // Используем объект для хранения лайков по postId
		hasLiked: state.hasLiked[postId] || false,
		toggleLike: state.toggleLike,
		initialize: state.initialize
	}))
	
	useEffect(() => {
		initialize(postId)
	}, [postId, initialize])
	
	const handleLike = async () => {
		await toggleLike(postId)
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
