import { toast } from 'sonner'
import { create } from 'zustand'

interface BookmarksStoreState {
	bookmarksCount: Record<number, number>; // Объект для хранения количества лайков по postId
	isAdded: Record<number, boolean>; // Объект для хранения состояния лайка по postId
	toggleBookmark: (postId: number) => Promise<void>;
	initialize: (postId: number) => Promise<void>;
}

let debounceTimers: Record<number, NodeJS.Timeout | null> = {} // Объект для хранения таймеров по postId

export const useBookmarksStore = create<BookmarksStoreState>((set, get) => ({
	bookmarksCount: {},
	isAdded: {},
	async toggleBookmark(postId: number) {
		const { isAdded, bookmarksCount } = get()
		
		if (debounceTimers[postId]) {
			clearTimeout(debounceTimers[postId]!)
		}
		
		debounceTimers[postId] = setTimeout(async () => {
			try {
				if (isAdded[postId]) {
					const response = await fetch(`/api/posts/${postId}/bookmarks/delete`, { method: 'POST' })
					if (response.status === 401) {
						toast.error('Необходимо авторизоваться', { icon: '❌' })
						return
					}
					if (!response.ok) throw new Error('Failed to delete')
					set(state => ({
						isAdded: { ...state.isAdded, [postId]: false },
						bookmarksCount: { ...state.bookmarksCount, [postId]: (state.bookmarksCount[postId] || 0) - 1 }
					}))
				} else {
					const response = await fetch(`/api/posts/${postId}/bookmarks/post`, { method: 'POST' })
					if (response.status === 401) {
						toast.error('Необходимо авторизоваться', { icon: '❌' })
						return
					}
					if (!response.ok) throw new Error('Failed to post bookmark')
					set(state => ({
						isAdded: { ...state.isAdded, [postId]: true },
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
			const response = await fetch(`/api/posts/${postId}/bookmarks/status`)
			if (!response.ok) throw new Error('Failed to fetch bookmark status')
			const { bookmarksCount, isAdded } = await response.json()
			set(state => ({
				bookmarksCount: { ...state.bookmarksCount, [postId]: bookmarksCount },
				isAdded: { ...state.isAdded, [postId]: isAdded }
			}))
		} catch (error) {
			console.error(error)
		}
	}
}))
