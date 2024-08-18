import { Api } from '@/shared/services/api-client'
import { Post } from '@prisma/client'
import React from 'react'

export const useUserSubscriptionsPosts = (userId: string) => {
	const [posts, setPosts] = React.useState<Post[]>([])
	const [loading, setLoading] = React.useState(true)
	
	React.useEffect(() => {
		async function fetchUserSubscriptionsPosts() {
			try {
				setLoading(true)
				const posts = await Api.subscriptions.getPostsSubscriptionsByUserId(userId)
				setPosts(posts)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		
		if (userId) {
			fetchUserSubscriptionsPosts()
		}
	}, [userId])
	
	return {
		posts,
		loading
	}
}
