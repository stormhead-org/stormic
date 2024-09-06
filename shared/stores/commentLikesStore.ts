import { toast } from 'sonner'
import { create } from 'zustand'

interface LikeStoreState {
	likesCount: Record<number, number>; // Объект для хранения количества лайков по commentId
	hasLiked: Record<number, boolean>; // Объект для хранения состояния лайка по commentId
	toggleLike: (commentId: number) => Promise<void>;
	initialize: (commentId: number) => Promise<void>;
}

let debounceTimers: Record<number, NodeJS.Timeout | null> = {} // Объект для хранения таймеров по commentId

export const useCommentLikesStore = create<LikeStoreState>((set, get) => ({
	likesCount: {},
	hasLiked: {},
	async toggleLike(commentId: number) {
		const { hasLiked, likesCount } = get()
		
		if (debounceTimers[commentId]) {
			clearTimeout(debounceTimers[commentId]!)
		}
		
		debounceTimers[commentId] = setTimeout(async () => {
			try {
				if (hasLiked[commentId]) {
					const response = await fetch(`/api/comments/${commentId}/unlike`, { method: 'DELETE' })
					if (response.status === 401) {
						toast.error('Необходимо авторизоваться', { icon: '❌' })
						return
					}
					if (!response.ok) throw new Error('Failed to unlike')
					set(state => ({
						hasLiked: { ...state.hasLiked, [commentId]: false },
						likesCount: { ...state.likesCount, [commentId]: (state.likesCount[commentId] || 0) - 1 }
					}))
				} else {
					const response = await fetch(`/api/comments/${commentId}/like`, { method: 'POST' })
					if (response.status === 401) {
						toast.error('Необходимо авторизоваться', { icon: '❌' })
						return
					}
					if (!response.ok) throw new Error('Failed to like')
					set(state => ({
						hasLiked: { ...state.hasLiked, [commentId]: true },
						likesCount: { ...state.likesCount, [commentId]: (state.likesCount[commentId] || 0) + 1 }
					}))
				}
			} catch (error) {
				console.error(error)
			}
		}, 100) // Задержка 100 миллисекунд
		
	},
	async initialize(commentId: number) {
		try {
			const response = await fetch(`/api/comments/${commentId}/status`)
			if (!response.ok) throw new Error('Failed to fetch like status')
			const { likesCount, hasLiked } = await response.json()
			set(state => ({
				likesCount: { ...state.likesCount, [commentId]: likesCount },
				hasLiked: { ...state.hasLiked, [commentId]: hasLiked }
			}))
		} catch (error) {
			console.error(error)
		}
	}
}))
