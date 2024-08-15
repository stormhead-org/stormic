import { Api } from '@/shared/services/api-client'
import { Post } from '@prisma/client'
import React from 'react'

export const usePosts = () => {
	const [posts, setPosts] = React.useState<Post[]>([])
	const [loading, setLoading] = React.useState(true)
	
	React.useEffect(() => {
		async function fetchPosts() {
			try {
				setLoading(true)
				const posts = await Api.posts.getAll()
				setPosts(posts)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		
		fetchPosts()
	}, [])
	
	return {
		posts,
		loading,
	}
}
