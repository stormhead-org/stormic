import { Api } from '@/shared/services/api-client'
import { Post } from '@prisma/client'
import React from 'react'

export const usePostById = (postId: number) => {
	const [post, setPost] = React.useState<Post[]>([])
	const [loading, setLoading] = React.useState(true)
	
	React.useEffect(() => {
		async function fetchPost() {
			try {
				setLoading(true)
				const post = await Api.posts.getPostById(postId)
				setPost(post)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		
		if (postId) {
			fetchPost()
		}
	}, [postId])
	
	return {
		post,
		loading
	}
}
