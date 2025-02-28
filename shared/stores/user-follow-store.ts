import { toast } from 'sonner'
import { create } from 'zustand'

interface FollowStoreState {
	followersCount: Record<number, number>
	isFollowing: Record<number, boolean>
	toggleFollow: (userId: number) => Promise<void>
	initialize: (userId: number) => Promise<void>
}

let debounceTimers: Record<number, NodeJS.Timeout | null> = {}

export const useFollowStore = create<FollowStoreState>((set, get) => ({
	followersCount: {},
	isFollowing: {},

	async toggleFollow(userId: number) {
		const { isFollowing, followersCount } = get()

		if (debounceTimers[userId]) {
			clearTimeout(debounceTimers[userId]!)
		}

		debounceTimers[userId] = setTimeout(async () => {
			try {
				const action = isFollowing[userId] ? 'unfollow' : 'follow'
				const method = 'POST'
				const response = await fetch(`/api/users/${userId}/${action}`, {
					method,
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ followingId: userId }) // Убедитесь, что тело запроса корректное
				})

				if (response.status === 401) {
					toast.error('Необходимо авторизоваться', { icon: '❌' })
					return
				}

				// Проверьте, что ответ не пустой и является JSON
				const data = await response.json()

				if (!response.ok)
					throw new Error(data.error || 'Failed to toggle follow')

				set(state => ({
					isFollowing: {
						...state.isFollowing,
						[userId]: action === 'follow'
					},
					followersCount: {
						...state.followersCount,
						[userId]:
							action === 'follow'
								? (state.followersCount[userId] || 0) + 1
								: (state.followersCount[userId] || 0) - 1
					}
				}))
			} catch (error) {
				console.error('Failed to toggle follow:', error)
			}
		}, 200)
	},

	async initialize(userId: number) {
		try {
			const response = await fetch(`/api/users/${userId}/status`)
			if (!response.ok) throw new Error('Failed to fetch follow status')
			const { followersCount, isFollowing } = await response.json()
			set(state => ({
				followersCount: { ...state.followersCount, [userId]: followersCount },
				isFollowing: { ...state.isFollowing, [userId]: isFollowing }
			}))
		} catch (error) {
			console.error(error)
		}
	}
}))
