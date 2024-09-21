import { toast } from 'sonner'
import { create } from 'zustand'

interface BookmarksStoreState {
	bookmarksCount: Record<number, number>; // Объект для хранения количества лайков по postId
	hasAdded: Record<number, boolean>; // Объект для хранения состояния лайка по postId
	toggleBookmark: (postId: number) => Promise<void>;
	initialize: (postId: number) => Promise<void>;
}

let debounceTimers: Record<number, NodeJS.Timeout | null> = {} // Объект для хранения таймеров по postId

export const useBookmarksStore = create<BookmarksStoreState>((set, get) => ({
	bookmarksCount: {},
	hasAdded: {},
	async toggleBookmark(postId: number) {
		const { hasAdded, bookmarksCount } = get()
		
		if (debounceTimers[postId]) {
			clearTimeout(debounceTimers[postId]!)
		}
		
		debounceTimers[postId] = setTimeout(async () => {
			try {
				if (hasAdded[postId]) {
					const response = await fetch(`/api/bookmarks/${postId}/delete`, { method: 'DELETE' })
					if (response.status === 401) {
						toast.error('Необходимо авторизоваться', { icon: '❌' })
						return
					}
					if (!response.ok) throw new Error('Failed to delete')
					set(state => ({
						hasAdded: { ...state.hasAdded, [postId]: false },
						bookmarksCount: { ...state.bookmarksCount, [postId]: (state.bookmarksCount[postId] || 0) - 1 }
					}))
				} else {
					const response = await fetch(`/api/bookmarks/${postId}/add`, { method: 'POST' })
					if (response.status === 401) {
						toast.error('Необходимо авторизоваться', { icon: '❌' })
						return
					}
					if (!response.ok) throw new Error('Failed to add bookmark')
					set(state => ({
						hasAdded: { ...state.hasAdded, [postId]: true },
						bookmarksCount: { ...state.bookmarksCount, [postId]: (state.bookmarksCount[postId] || 0) + 1 }
					}))
				}
			} catch (error) {
				console.error(error)
			}
		}, 200) // Задержка 200 миллисекунд
		
	},
	async initialize(postId: number) {
		try {
			const response = await fetch(`/api/bookmarks/${postId}/status`)
			if (!response.ok) throw new Error('Failed to fetch bookmark status')
			const { bookmarksCount, hasAdded } = await response.json()
			set(state => ({
				bookmarksCount: { ...state.bookmarksCount, [postId]: bookmarksCount },
				hasAdded: { ...state.hasAdded, [postId]: hasAdded }
			}))
		} catch (error) {
			console.error(error)
		}
	}
}))
