import { cn } from '@/shared/lib/utils'
import { useCommunityFollowStore } from '@/shared/stores/community-follow-store'
import React, { useEffect } from 'react'

interface Props {
	communityId: number
	className?: string
}

export const CommunityPostsCounter: React.FC<Props> = ({
	communityId,
	className
}) => {
	const { initialize, postsCount } = useCommunityFollowStore()

	// Инициализация данных подписки при монтировании компонента
	useEffect(() => {
		if (communityId !== undefined) {
			initialize(communityId) // Подгрузка текущего статуса подписки и количества подписчиков
		}
	}, [communityId, initialize])

	return (
		<div className={cn('', className)}>
			<p className='text-md font-bold'>
				{communityId !== undefined ? postsCount[communityId] || 0 : 0}
			</p>
		</div>
	)
}
