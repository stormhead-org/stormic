import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useCommunityFollowStore } from '@/shared/stores/community-follow-store'
import React, { useEffect } from 'react'
// import { useIntl } from 'react-intl'

interface FollowButtonProps {
	communityId: number // ID сообщества, на которого подписываются
}

const CommunityFollowButton: React.FC<FollowButtonProps> = ({
	communityId
}) => {
	// const { formatMessage } = useIntl()

	// Использование Zustand-стора для работы с подписками
	const { isFollowing, toggleFollow, initialize } = useCommunityFollowStore()

	// Инициализация данных подписки при монтировании компонента
	useEffect(() => {
		initialize(communityId) // Подгрузка текущего статуса подписки и количества подписчиков
	}, [communityId, initialize])

	// Обработка клика по кнопке для подписки/отписки
	const handleFollow = async () => {
		try {
			await toggleFollow(communityId) // Тогглинг подписки (подписка или отписка)
		} catch (error) {
			console.error('Failed to toggle follow:', error)
		}
	}

	return (
		<Button
			variant='blue'
			className={cn(
				'h-6 w-26 text-sm font-bold mt-auto mb-[2px] my-0',
				isFollowing[communityId] ? 'bg-blue-800' : ''
			)}
			type='button'
			onClick={handleFollow}
		>
			{isFollowing[communityId] ? (
				// <>
				// 	{formatMessage({ id: 'profileHeader.profileUnsubscribeButton' })}
				// </>
				<>Отписаться</>
			) : (
				// <>
				// 	{formatMessage({ id: 'profileHeader.profileSubscribeButton' })}
				// </>
				<>Подписаться</>
			)}
		</Button>
	)
}

export default CommunityFollowButton
