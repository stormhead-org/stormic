import { cn } from '@/shared/lib/utils'
import { useCommunityFollowStore } from '@/shared/stores/community-follow-store'
import React, { useEffect } from 'react'

interface Props {
	communityId: number
	className?: string
}

export const CommunityFollowersCounter: React.FC<Props> = ({
	communityId,
	className
}) => {
	const { initialize, followersCount } = useCommunityFollowStore()

	useEffect(() => {
		if (communityId !== undefined) {
			initialize(communityId)
		}
	}, [communityId, initialize])

	return (
		<div className={cn('', className)}>
			{communityId !== undefined ? followersCount[communityId] || 0 : 0}
		</div>
	)
}
