import { Api } from '@/shared/services/api-client'
import { Comment } from '@prisma/client'
import React from 'react'

export const useComments = () => {
	const [comments, setComments] = React.useState<Comment[]>([])
	const [loading, setLoading] = React.useState(true)
	
	React.useEffect(() => {
		async function fetchComments() {
			try {
				setLoading(true)
				const comments = await Api.comments.getAll()
				setComments(comments)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		
		fetchComments()
	}, [])
	
	return {
		comments,
		loading
	}
}
