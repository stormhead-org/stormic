import { Api } from '@/shared/services/api-client'
import { Post } from '@prisma/client'
import React from 'react'

export const useUserPosts = (userId: string) => {
	const [posts, setPosts] = React.useState<Post[]>([])
	const [loading, setLoading] = React.useState(true)
	
	React.useEffect(() => {
		async function fetchUserPosts() {
			try {
				setLoading(true)
				const posts = await Api.posts.getPostsByUserId(userId)
				setPosts(posts)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		
		if (userId) {
			fetchUserPosts()
		}
	}, [userId])
	
	return {
		posts,
		loading
	}
}
