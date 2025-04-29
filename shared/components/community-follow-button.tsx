import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useCommunityFollowStore } from '@/shared/stores/community-follow-store'
import React, { useEffect } from 'react'

// import { useIntl } from 'react-intl'

interface FollowButtonProps {
	communityId: number
}

const CommunityFollowButton: React.FC<FollowButtonProps> = ({
	communityId
}) => {
	// const { formatMessage } = useIntl()

	const { isFollowing, toggleFollow, initialize } = useCommunityFollowStore()

	useEffect(() => {
		initialize(communityId)
	}, [communityId, initialize])

	const handleFollow = async () => {
		try {
			await toggleFollow(communityId)
		} catch (error) {
			console.error('Failed to toggle follow:', error)
		}
	}

	return (
		<Button
			variant='blue'
			className={cn(
				'h-6 w-26 font-medium mt-auto mb-[2px] my-0 rounded-xl text-background',
				isFollowing[communityId] ? 'bg-theme' : ''
			)}
			type='button'
			onClick={handleFollow}
		>
			{isFollowing[communityId] ? (
				// <>
				// 	{formatMessage({ id: 'profileHeader.profileUnsubscribeButton' })}
				// </>
				<>Покинуть</>
			) : (
				// <>
				// 	{formatMessage({ id: 'profileHeader.profileSubscribeButton' })}
				// </>
				<>Присоединиться</>
			)}
		</Button>
	)
}

export default CommunityFollowButton
