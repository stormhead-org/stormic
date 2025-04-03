// ModerationPanel.tsx
'use client'

import { CommunityUserBan } from '@/shared/components/info-blocks/community-user-ban'
import { Button } from '@/shared/components/ui/button'
import { useCommunityPermissions } from '@/shared/hooks/useCommunityPermissions'

interface Props {
	currentUser: { id: number } | null
	communityId: number
}

const ModerationPanel: React.FC<Props> = ({ currentUser, communityId }) => {
	const { permissions, loading, error } = useCommunityPermissions(
		currentUser,
		communityId
	)

	if (loading) return <p>Загрузка прав...</p>
	if (error) return <p>Ошибка: {error}</p>
	if (!permissions) return <p>У вас нет прав в этом сообществе</p>

	if (permissions.COMMUNITY_USER_HAS_BANNED) {
		return <CommunityUserBan />
	}

	return (
		<div>
			{permissions.COMMUNITY_USER_HAS_BANNED && (
				<p>Вы заблокированы в этом сообществе</p>
			)}
			{permissions.COMMUNITY_USER_HAS_MUTED && (
				<p>Вы заглушены в этом сообществе</p>
			)}
			{permissions.HOST_OWNER && <p>Вы владелец хоста</p>}
			{permissions.COMMUNITY_OWNER && <p>Вы владелец сообщества</p>}
			{permissions.COMMUNITY_ROLES_MANAGEMENT && (
				<Button>Управлять ролями</Button>
			)}
			{permissions.COMMUNITY_USER_BAN && <Button>Забанить пользователя</Button>}
			{permissions.COMMUNITY_USER_MUTE && (
				<Button>Заглушить пользователя</Button>
			)}
			{permissions.COMMUNITY_POST_DELETE && <Button>Удалить пост</Button>}
			{permissions.COMMUNITY_POST_REMOVE_FROM_PUBLICATION && (
				<Button>Снимать посты с публикации</Button>
			)}
			{permissions.COMMUNITY_COMMENTS_DELETE && (
				<Button>Удалить комментарии</Button>
			)}
		</div>
	)
}

export default ModerationPanel
