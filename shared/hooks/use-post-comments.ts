import { Api } from '@/shared/services/api-client'
import type { Comment } from '@prisma/client'
import React from 'react'

export const usePostsComments = (postId: string) => {
	const [comments, setComments] = React.useState<Comment[]>([])
	const [loading, setLoading] = React.useState(true)
	
	React.useEffect(() => {
		async function fetchPostComments() {
			try {
				setLoading(true)
				const comments = await Api.comments.getCommentsByPostId(postId)
				setComments(comments)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		
		if (postId) {
			fetchPostComments()
		}
	}, [postId])
	
	return {
		comments,
		loading
	}
}
