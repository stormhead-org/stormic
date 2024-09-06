import { useLikesStore } from '@/shared/stores/likeStore'
import React, { useState } from 'react'

interface CommentLikeButtonProps {
	commentId: number;
}

const CommentLikeButton: React.FC<CommentLikeButtonProps> = ({ commentId }) => {
	const { commentLikes, addCommentLike, removeCommentLike } = useLikesStore()
	const [loading, setLoading] = useState(false)
	
	const hasLiked = commentLikes.has(commentId)
	
	const handleLike = async () => {
		setLoading(true)
		try {
			if (hasLiked) {
				await fetch(`/api/comments/${commentId}/unlike`, { method: 'DELETE' })
				removeCommentLike(commentId)
			} else {
				await fetch(`/api/comments/${commentId}/like`, { method: 'POST' })
				addCommentLike(commentId)
			}
		} catch (error) {
			console.error('Error while liking/unliking comment:', error)
		}
		setLoading(false)
	}
	
	return (
		<button onClick={handleLike} disabled={loading}>
			{hasLiked ? 'Unlike' : 'Like'}
		</button>
	)
}

export default CommentLikeButton
