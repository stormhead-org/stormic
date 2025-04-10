import { toast } from 'sonner'
import { create } from 'zustand'

interface LikeStoreState {
	likesCount: Record<number, number>
	commentsCount: Record<number, number>
	isLiked: Record<number, boolean>
	toggleLike: (postId: number) => Promise<void>
	initialize: (postId: number) => Promise<void>
}

let debounceTimers: Record<number, NodeJS.Timeout | null> = {} // Объект для хранения таймеров по postId

export const usePostLikesStore = create<LikeStoreState>((set, get) => ({
	commentsCount: {},
	likesCount: {},
	isLiked: {},
	async toggleLike(postId: number) {
		const { isLiked, likesCount } = get()

		if (debounceTimers[postId]) {
			clearTimeout(debounceTimers[postId]!)
		}

		debounceTimers[postId] = setTimeout(async () => {
			try {
				if (isLiked[postId]) {
					const response = await fetch(`/api/posts/${postId}/unlike`, {
						method: 'POST'
					})
					if (response.status === 401) {
						toast.error('Необходимо авторизоваться', { icon: '❌' })
						return
					}
					if (!response.ok) throw new Error('Failed to unlike')
					set(state => ({
						isLiked: { ...state.isLiked, [postId]: false },
						likesCount: {
							...state.likesCount,
							[postId]: (state.likesCount[postId] || 0) - 1
						}
					}))
				} else {
					const response = await fetch(`/api/posts/${postId}/like`, {
						method: 'POST'
					})
					if (response.status === 401) {
						toast.error('Необходимо авторизоваться', { icon: '❌' })
						return
					}
					if (!response.ok) throw new Error('Failed to like')
					set(state => ({
						isLiked: { ...state.isLiked, [postId]: true },
						likesCount: {
							...state.likesCount,
							[postId]: (state.likesCount[postId] || 0) + 1
						}
					}))
				}
			} catch (error) {
				console.error(error)
			}
		}, 200) // Задержка 200 миллисекунд
	},
	async initialize(postId: number) {
		try {
			const response = await fetch(`/api/posts/${postId}/status`)
			if (!response.ok) throw new Error('Failed to fetch like status')
			const { likesCount, commentsCount, isLiked } = await response.json()
			set(state => ({
				likesCount: { ...state.likesCount, [postId]: likesCount },
				commentsCount: { ...state.commentsCount, [postId]: commentsCount },
				isLiked: { ...state.isLiked, [postId]: isLiked }
			}))
		} catch (error) {
			console.error(error)
		}
	}
}))
