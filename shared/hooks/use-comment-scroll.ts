import { useEffect, useState } from 'react'

type ChatScrollProps = {
	chatRef: React.RefObject<HTMLDivElement>;
	bottomRef: React.RefObject<HTMLDivElement>;
	shouldLoadMore: boolean;
	loadMore: () => void;
	count: number;
};

export const useCommentScroll = ({
	                                 chatRef,
	                                 bottomRef,
	                                 shouldLoadMore,
	                                 loadMore,
	                                 count
                                 }: ChatScrollProps) => {
	const [hasInitialized, setHasInitialized] = useState(false)
	
	useEffect(() => {
		const topDiv = chatRef?.current
		
		if (topDiv) {
			const handleScroll = () => {
				const scrollHeight = topDiv.scrollHeight
				const scrollTop = topDiv.scrollTop
				const clientHeight = topDiv.clientHeight
				
				// Проверка, если пользователь прокрутил до низа контейнера
				if (scrollHeight - scrollTop <= clientHeight + 50 && shouldLoadMore) {
					loadMore()
				}
			}
			
			topDiv.addEventListener('scroll', handleScroll)
			
			return () => {
				topDiv.removeEventListener('scroll', handleScroll)
			}
		}
	}, [shouldLoadMore, loadMore, chatRef])
	
	//функционал автоматической прокрутки комментариев
	/*
	useEffect(() => {
		const bottomDiv = bottomRef?.current
		const topDiv = chatRef.current

		const shouldAutoScroll = () => {
			if (!hasInitialized && bottomDiv) {
				setHasInitialized(true)
				return true
			}

			if (!topDiv) {
				return false
			}

			const distanceFromBottom =
				topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight

			return distanceFromBottom <= 100
		}

		if (shouldAutoScroll()) {
			setTimeout(() => {
				bottomRef.current?.scrollIntoView({
					behavior: 'smooth'
				})
			}, 100)
		}
	}, [bottomRef, chatRef, count, hasInitialized])
	*/
}
