import { toast } from 'sonner'
import { create } from 'zustand'

interface CommunityFollowStoreState {
	followersCount: Record<number, number>
	postsCount: Record<number, number>
	isFollowing: Record<number, boolean>
	toggleFollow: (communityId: number) => Promise<void>
	initialize: (communityId: number) => Promise<void>
}

let debounceTimers: Record<number, NodeJS.Timeout | null> = {}

export const useCommunityFollowStore = create<CommunityFollowStoreState>(
	(set, get) => ({
		followersCount: {},
		postsCount: {},
		isFollowing: {},

		async toggleFollow(communityId: number) {
			const { isFollowing, followersCount } = get()

			if (debounceTimers[communityId]) {
				clearTimeout(debounceTimers[communityId]!)
			}

			debounceTimers[communityId] = setTimeout(async () => {
				try {
					const action = isFollowing[communityId] ? 'unfollow' : 'follow'
					const method = 'POST'
					const response = await fetch(
						`/api/communities/${communityId}/${action}`,
						{
							method,
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({ communityId })
						}
					)

					if (response.status === 401) {
						toast.error('Необходимо авторизоваться', { icon: '❌' })
						return
					}

					// Проверка, что ответ не пустой и является JSON
					const data = await response.json()

					if (!response.ok) throw new Error(data.error || `Failed to ${action}`)

					set(state => ({
						isFollowing: {
							...state.isFollowing,
							[communityId]: action === 'follow'
						},
						followersCount: {
							...state.followersCount,
							[communityId]:
								action === 'follow'
									? (state.followersCount[communityId] || 0) + 1
									: (state.followersCount[communityId] || 0) - 1
						}
					}))
				} catch (error: any) {
					console.error(
						`Failed to toggle follow for category ${communityId}:`,
						error
					)
					toast.error(error.message || 'An error occurred', { icon: '❌' })
				}
			}, 200)
		},

		async initialize(communityId: number) {
			try {
				const response = await fetch(`/api/communities/${communityId}/status`)
				if (!response.ok) throw new Error('Failed to fetch follow status')
				const { followersCount, postsCount, isFollowing } =
					await response.json()
				set(state => ({
					postsCount: {
						...state.postsCount,
						[communityId]: postsCount
					},
					followersCount: {
						...state.followersCount,
						[communityId]: followersCount
					},
					isFollowing: { ...state.isFollowing, [communityId]: isFollowing }
				}))
			} catch (error: any) {
				// console.error(`Failed to initialize follow status for category ${communityId}:`, error);
				// toast.error(error.message || 'Failed to initialize follow status', { icon: '❌' });
			}
		}
	})
)
