import { usePostLikesStore } from '@/shared/stores/postLikesStore'
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
		<button onClick={handleLike} className='like-button'>
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
