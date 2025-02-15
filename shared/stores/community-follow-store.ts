import { toast } from 'sonner'
import { create } from 'zustand'

interface CommunityFollowStoreState {
	followersCount: Record<number, number>;
	isFollowing: Record<number, boolean>;
	toggleFollow: (categoryId: number) => Promise<void>;
	initialize: (categoryId: number) => Promise<void>;
}

let debounceTimers: Record<number, NodeJS.Timeout | null> = {}

export const useCommunityFollowStore = create<CommunityFollowStoreState>((set, get) => ({
	followersCount: {},
	isFollowing: {},
	
	async toggleFollow(categoryId: number) {
		const { isFollowing, followersCount } = get()
		
		if (debounceTimers[categoryId]) {
			clearTimeout(debounceTimers[categoryId]!)
		}
		
		debounceTimers[categoryId] = setTimeout(async () => {
			try {
				const action = isFollowing[categoryId] ? 'unfollow' : 'follow'
				const method = action === 'follow' ? 'POST' : 'DELETE'
				const response = await fetch(`/api/categories/${categoryId}/${action}`, {
					method,
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ categoryId }) // Передаём categoryId
				})
				
				if (response.status === 401) {
					toast.error('Необходимо авторизоваться', { icon: '❌' })
					return
				}
				
				// Проверка, что ответ не пустой и является JSON
				const data = await response.json()
				
				if (!response.ok) throw new Error(data.error || `Failed to ${action}`)
				
				set((state) => ({
					isFollowing: {
						...state.isFollowing,
						[categoryId]: action === 'follow'
					},
					followersCount: {
						...state.followersCount,
						[categoryId]: action === 'follow'
							? (state.followersCount[categoryId] || 0) + 1
							: (state.followersCount[categoryId] || 0) - 1
					}
				}))
			} catch (error: any) {
				console.error(`Failed to toggle follow for category ${categoryId}:`, error)
				toast.error(error.message || 'An error occurred', { icon: '❌' })
			}
		}, 200)
	},
	
	async initialize(categoryId: number) {
		try {
			const response = await fetch(`/api/categories/${categoryId}/status`)
			if (!response.ok) throw new Error('Failed to fetch follow status')
			const { followersCount, isFollowing } = await response.json()
			set((state) => ({
				followersCount: { ...state.followersCount, [categoryId]: followersCount },
				isFollowing: { ...state.isFollowing, [categoryId]: isFollowing }
			}))
		} catch (error: any) {
			// console.error(`Failed to initialize follow status for category ${categoryId}:`, error);
			// toast.error(error.message || 'Failed to initialize follow status', { icon: '❌' });
		}
	}
}))
