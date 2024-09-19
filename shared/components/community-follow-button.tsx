import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useCommunityFollowStore } from '@/shared/stores/community-follow-store'
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl'

interface FollowButtonProps {
	categoryId: number; // ID пользователя, на которого подписываются
}

const CommunityFollowButton: React.FC<FollowButtonProps> = ({ categoryId }) => {
	const { formatMessage } = useIntl()
	
	// Использование Zustand-стора для работы с подписками
	const { isFollowing, toggleFollow, initialize } = useCommunityFollowStore();
	
	// Инициализация данных подписки при монтировании компонента
	useEffect(() => {
		initialize(categoryId); // Подгрузка текущего статуса подписки и количества подписчиков
	}, [categoryId, initialize]);
	
	// Обработка клика по кнопке для подписки/отписки
	const handleFollow = async () => {
		try {
			await toggleFollow(categoryId); // Тогглинг подписки (подписка или отписка)
		} catch (error) {
			console.error('Failed to toggle follow:', error);
		}
	};
	
	return (
		<Button
			variant='blue'
			className={cn('h-6 w-26 text-sm font-bold mt-auto mb-[2px] my-0', isFollowing[categoryId] ? 'bg-blue-800': '')}
			type='button'
			onClick={handleFollow}>
				{isFollowing[categoryId] ? (
					<>
						{formatMessage({ id: 'profileHeader.profileUnsubscribeButton' })}
					</>
				) : (
					<>
						{formatMessage({ id: 'profileHeader.profileSubscribeButton' })}
					</>
				)}
		</Button>
	);
};

export default CommunityFollowButton;
