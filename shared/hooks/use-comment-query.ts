import { useInfiniteQuery } from '@tanstack/react-query'
import qs from 'query-string'
import { useSocket } from '../providers/SocketProvider'

interface ChatQueryProps {
	queryKey: string
	apiUrl: string
	paramKey: 'postId' | 'conversationId' | 'global'
	paramValue: string
}

export const useCommentQuery = ({
	queryKey,
	apiUrl,
	paramKey,
	paramValue
}: ChatQueryProps) => {
	const { isConnected } = useSocket()

	const fetchMessages = async ({ pageParam = undefined }) => {
		const url = qs.stringifyUrl(
			{
				url: apiUrl,
				query: {
					cursor: pageParam,
					[paramKey]: paramValue
				}
			},
			{ skipNull: true }
		)

		console.log('Fetching:', url)
		const res = await fetch(url)
		const data = await res.json()
		console.log('Response:', data)

		return {
			docs: data.docs || [],
			nextCursor: data.nextPage ?? null // если API иногда возвращает null
		}
	}

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery({
			queryKey: [queryKey],
			queryFn: fetchMessages,
			getNextPageParam: lastPage => {
				console.log('Last page:', lastPage)
				return lastPage?.nextCursor ?? undefined
			},
			refetchInterval: isConnected ? false : 1000,
			initialPageParam: undefined
		})

	console.log('Query data:', data)

	return {
		data: data?.pages.flatMap(page => page.docs) ?? [], // Теперь это массив всех комментариев
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status
	}
}
