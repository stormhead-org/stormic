'use client'

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

	const fetchMessages = async ({ pageParam = 1 }) => {
		const url = qs.stringifyUrl(
			{
				url: apiUrl,
				query: {
					page: pageParam,
					[paramKey]: paramValue
				}
			},
			{ skipNull: true }
		)

		const res = await fetch(url)
		console.log(res.json)
		return res.json()
	}

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery({
			queryKey: [queryKey],
			queryFn: fetchMessages,
			getNextPageParam: lastPage => {
				return lastPage.hasNextPage ? lastPage.page + 1 : undefined
			},
			refetchInterval: isConnected ? false : 1000,
			initialPageParam: 1
		})

	return {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status
	}
}
