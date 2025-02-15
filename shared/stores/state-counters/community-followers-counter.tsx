import { cn } from '@/shared/lib/utils'
import { useCommunityFollowStore } from '@/shared/stores/community-follow-store'
import React, { useEffect } from 'react'

interface Props {
	categoryId: number
	className?: string
}

export const CategoryFollowersCounter: React.FC<Props> = ({
	                                                      categoryId,
	                                                      className
                                                          }) => {
	const { initialize, followersCount } = useCommunityFollowStore();
	
	// Инициализация данных подписки при монтировании компонента
	useEffect(() => {
		if (categoryId !== undefined) {
			initialize(categoryId); // Подгрузка текущего статуса подписки и количества подписчиков
		}
	}, [categoryId, initialize]);
	
	return (
		<div className={cn('', className)}>
				<p className='text-md font-bold'>{categoryId !== undefined ? followersCount[categoryId] || 0 : 0}</p>
		</div>
	)
}
