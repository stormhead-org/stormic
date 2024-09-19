import { cn } from '@/shared/lib/utils'
import { useFollowStore } from '@/shared/stores/user-follow-store'
import React, { useEffect } from 'react'

interface Props {
	userId: number
	className?: string
}

export const UserFollowersCounter: React.FC<Props> = ({
	                                             userId,
	                                             className
                                             }) => {
	const { initialize, followersCount } = useFollowStore();
	
	// Инициализация данных подписки при монтировании компонента
	useEffect(() => {
		if (userId !== undefined) {
			initialize(userId); // Подгрузка текущего статуса подписки и количества подписчиков
		}
	}, [userId, initialize]);
	
	return (
		<div className={cn('', className)}>
				<p className='text-md font-bold'>{userId !== undefined ? followersCount[userId] || 0 : 0}</p>
		</div>
	)
}
