import { create } from 'zustand'

interface LikeStoreState {
	likesCount: Record<number, number>; // Объект для хранения количества лайков по postId
	hasLiked: Record<number, boolean>; // Объект для хранения состояния лайка по postId
	toggleLike: (postId: number) => Promise<void>;
	initialize: (postId: number) => Promise<void>;
}

let debounceTimers: Record<number, NodeJS.Timeout | null> = {} // Объект для хранения таймеров по postId

export const usePostLikesStore = create<LikeStoreState>((set, get) => ({
	likesCount: {},
	hasLiked: {},
	async toggleLike(postId: number) {
		const { hasLiked, likesCount } = get()
		
		// Очистить таймер, если он существует
		if (debounceTimers[postId]) {
			clearTimeout(debounceTimers[postId]!)
		}
		
		// Установить новый таймер
		debounceTimers[postId] = setTimeout(async () => {
			try {
				if (hasLiked[postId]) {
					const response = await fetch(`/api/posts/${postId}/unlike`, { method: 'DELETE' })
					if (!response.ok) throw new Error('Failed to unlike')
					set(state => ({
						hasLiked: { ...state.hasLiked, [postId]: false },
						likesCount: { ...state.likesCount, [postId]: (state.likesCount[postId] || 0) - 1 }
					}))
				} else {
					const response = await fetch(`/api/posts/${postId}/like`, { method: 'POST' })
					if (!response.ok) throw new Error('Failed to like')
					set(state => ({
						hasLiked: { ...state.hasLiked, [postId]: true },
						likesCount: { ...state.likesCount, [postId]: (state.likesCount[postId] || 0) + 1 }
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
			const { likesCount, hasLiked } = await response.json()
			set(state => ({
				likesCount: { ...state.likesCount, [postId]: likesCount },
				hasLiked: { ...state.hasLiked, [postId]: hasLiked }
			}))
		} catch (error) {
			console.error(error)
		}
	}
}))
