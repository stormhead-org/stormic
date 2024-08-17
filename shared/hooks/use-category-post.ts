import { Api } from '@/shared/services/api-client'
import { Post } from '@prisma/client'
import React from 'react'

export const useCategoryPosts = (categoryId: string) => {
	const [posts, setPosts] = React.useState<Post[]>([])
	const [loading, setLoading] = React.useState(true)
	
	React.useEffect(() => {
		async function fetchUserPosts() {
			try {
				setLoading(true)
				const posts = await Api.posts.getPostsByCategoryId(categoryId)
				setPosts(posts)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		
		if (categoryId) {
			fetchUserPosts()
		}
	}, [categoryId])
	
	return {
		posts,
		loading
	}
}
