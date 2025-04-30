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
	const { initialize, followersCount } = useFollowStore()

	useEffect(() => {
		if (userId !== undefined) {
			initialize(userId)
		}
	}, [userId, initialize])

	return (
		<div className={cn('', className)}>
			{userId !== undefined ? followersCount[userId] || 0 : 0}
		</div>
	)
}
