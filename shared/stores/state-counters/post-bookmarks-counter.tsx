import { cn } from '@/shared/lib/utils'
import { useBookmarksStore } from '@/shared/stores/bookmarks-store'
import { useFollowStore } from '@/shared/stores/user-follow-store'
import React, { useEffect } from 'react'

interface Props {
	postId: number
	className?: string
}

export const PostBookmarksCounter: React.FC<Props> = ({
	                                                      postId,
	                                             className
                                             }) => {
	const { initialize, bookmarksCount } = useBookmarksStore();
	
	// Инициализация данных о закладках при монтировании компонента
	useEffect(() => {
		if (postId !== undefined) {
			initialize(postId); // Подгрузка текущего статуса закладок
		}
	}, [postId, initialize]);
	
	return (
		<div className={cn('', className)}>
				<p className='text-md font-bold'>{postId !== undefined ? bookmarksCount[postId] || 0 : 0}</p>
		</div>
	)
}
