import { usePostLikesStore } from '@/shared/stores/post-likes-store'
import { Heart } from 'lucide-react'
import React, { useEffect } from 'react'

interface LikeButtonProps {
	postId: number
}

export const PostLikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
	const likesCount = usePostLikesStore(state => state.likesCount[postId] || 0)
	const isLiked = usePostLikesStore(state => state.isLiked[postId] || false)
	const toggleLike = usePostLikesStore(state => state.toggleLike)
	const initialize = usePostLikesStore(state => state.initialize)

	useEffect(() => {
		initialize(postId)
	}, [postId, initialize])

	const handleLike = async () => {
		await toggleLike(postId)
	}

	return (
		<button
			onClick={handleLike}
			className='like-button focus:outline-none  mr-4'
		>
			<div className='flex group items-center cursor-pointer'>
				{isLiked ? (
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
