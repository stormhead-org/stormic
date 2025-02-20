// use-comment-query.ts
'use client'

import { useInfiniteQuery, InfiniteData, type QueryFunctionContext } from '@tanstack/react-query';
import qs from 'query-string';
import { useSocket } from '../providers/SocketProvider';
import type { Comment } from '@/payload-types';

interface ChatQueryProps {
	queryKey: string;
	apiUrl: string;
}

// Тип данных, возвращаемых каждой страницей
interface PageData {
	docs: Comment[];
	nextCursor: any; // Можно уточнить, например, string | null
}

export const useCommentQuery = ({ queryKey, apiUrl }: ChatQueryProps) => {
	const { isConnected } = useSocket();
	
	const fetchMessages = async ({ pageParam }: QueryFunctionContext<string[], any>) => {
		const url = qs.stringifyUrl(
			{
				url: apiUrl,
				query: { cursor: pageParam },
			},
			{ skipNull: true }
		);
		
		console.log('Fetching:', url);
		
		try {
			const res = await fetch(url);
			if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
			
			const data = await res.json();
			console.log('Response:', data);
			
			return {
				docs: (data.docs as Comment[]) ?? [],
				nextCursor: data.nextPage ?? null,
			};
		} catch (error) {
			console.error('Fetch error:', error);
			return { docs: [], nextCursor: null };
		}
	};
	
	return useInfiniteQuery({
		queryKey: [queryKey],
		queryFn: fetchMessages,
		getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
		refetchInterval: isConnected ? false : 1000,
		initialPageParam: null, // Соответствует типу pageParam в fetchMessages
	}); // Тип возвращаемого значения автоматически будет InferInfiniteQueryResult<InfiniteData<PageData>>
};
