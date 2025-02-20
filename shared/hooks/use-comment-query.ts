import { useInfiniteQuery } from '@tanstack/react-query'
import qs from 'query-string'
import { useSocket } from '../providers/SocketProvider'

interface ChatQueryProps {
	queryKey: string
	apiUrl: string
}

export const useCommentQuery = ({ queryKey, apiUrl }: ChatQueryProps) => {
	const { isConnected } = useSocket()

	const fetchMessages = async ({ pageParam = null }) => {
		const url = qs.stringifyUrl(
			{
				url: apiUrl,
				query: { cursor: pageParam }
			},
			{ skipNull: true }
		)

		console.log('Fetching:', url)

		try {
			const res = await fetch(url)
			if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)

			const data = await res.json()
			console.log('Response:', data)

			return {
				docs: data.docs ?? [],
				nextCursor: data.nextPage ?? null
			}
		} catch (error) {
			console.error('Fetch error:', error)
			return { docs: [], nextCursor: null }
		}
	}

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery({
			queryKey: [queryKey],
			queryFn: fetchMessages,
			getNextPageParam: lastPage => lastPage?.nextCursor ?? undefined,
			refetchInterval: isConnected ? false : 1000,
			initialPageParam: null
		})

	console.log('Query data:', data)

	return {
		data: data?.pages?.flatMap(page => page.docs) ?? [],
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status
	}
}
