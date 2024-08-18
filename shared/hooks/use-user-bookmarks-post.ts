import { Api } from '@/shared/services/api-client'
import { Post } from '@prisma/client'
import React from 'react'

export const useUserBookmarksPosts = (userId: string) => {
	const [posts, setPosts] = React.useState<Post[]>([])
	const [loading, setLoading] = React.useState(true)
	
	React.useEffect(() => {
		async function fetchUserBookmarksPosts() {
			try {
				setLoading(true)
				const posts = await Api.bookmarks.getPostsBookmarksByUserId(userId)
				setPosts(posts)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		
		if (userId) {
			fetchUserBookmarksPosts()
		}
	}, [userId])
	
	return {
		posts,
		loading
	}
}
