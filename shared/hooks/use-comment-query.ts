
import { useSocket } from '@/shared/providers/SocketProvider'
import { useInfiniteQuery } from '@tanstack/react-query'
import qs from 'query-string'


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
		
		const res = await fetch(url)
		return res.json()
	}
	
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery({
			queryKey: [queryKey],
			queryFn: fetchMessages,
			getNextPageParam: lastPage => lastPage?.nextCursor,
			refetchInterval: isConnected ? false : 1000,
			initialPageParam: undefined
		})
	
	return {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status
	}
}
