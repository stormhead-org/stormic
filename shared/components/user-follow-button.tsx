import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useFollowStore } from '@/shared/stores/user-follow-store'
import React, { useEffect } from 'react'
// import { useIntl } from 'react-intl'

interface FollowButtonProps {
	userId: number
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
	// const { formatMessage } = useIntl()

	// Использование Zustand-стора для работы с подписками
	const { isFollowing, toggleFollow, initialize } = useFollowStore()

	// Инициализация данных подписки при монтировании компонента
	useEffect(() => {
		initialize(userId) // Подгрузка текущего статуса подписки и количества подписчиков
	}, [userId, initialize])

	// Обработка клика по кнопке для подписки/отписки
	const handleFollow = async () => {
		try {
			await toggleFollow(userId) // Тогглинг подписки (подписка или отписка)
		} catch (error) {
			console.error('Failed to toggle follow:', error)
		}
	}

	return (
		<Button
			variant='blue'
			className={cn(
				'h-6 w-26 text-sm font-bold mt-auto mb-[2px] my-0',
				isFollowing[userId] ? 'bg-blue-800' : ''
			)}
			type='button'
			onClick={handleFollow}
		>
			{isFollowing[userId] ? (
				// <>{formatMessage({ id: 'profileHeader.profileUnsubscribeButton' })}</>
				<>Отписаться</>
			) : (
				// <>{formatMessage({ id: 'profileHeader.profileSubscribeButton' })}</>
				<>Подписаться</>
			)}
		</Button>
	)
}

export default FollowButton
