// shared/lib/getUserPermissions.ts
import { Role } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { mergePermissions, Permissions } from './permissions'

export async function getUserPermissions(
	userId: number,
	communityId: number
): Promise<Permissions | null> {
	try {
		const payload = await getPayload({ config: configPromise })

		// Получаем пользователя с ролями
		const user = await payload.findByID({
			collection: 'users',
			id: userId,
			depth: 2
		})

		if (!user) {
			console.log(`User with ID ${userId} not found`)
			return null
		}

		// Получаем данные сообщества
		const community = await payload.findByID({
			collection: 'communities',
			id: communityId,
			depth: 1
		})

		if (!community) {
			console.log(`Community with ID ${communityId} not found`)
			return null
		}

		// Проверяем, является ли пользователь владельцем сообщества
		const isCommunityOwner =
			community.owner === userId ||
			(typeof community.owner === 'object' && community.owner?.id === userId)

		// Получаем глобальные настройки хоста
		const globalHost = await payload.findGlobal({
			slug: 'host-settings',
			depth: 2
		})

		// Проверяем, является ли пользователь владельцем хоста
		const isHostOwner =
			globalHost.owner === userId ||
			(typeof globalHost.owner === 'object' && globalHost.owner?.id === userId)

		// Если пользователь — владелец хоста, даём все права
		if (isHostOwner) {
			const fullPermissions: Permissions = {
				COMMUNITY_ROLES_MANAGEMENT: true,
				COMMUNITY_USER_BAN: true,
				COMMUNITY_USER_MUTE: true,
				COMMUNITY_POST_DELETE: true,
				COMMUNITY_POST_REMOVE_FROM_PUBLICATION: true,
				COMMUNITY_COMMENTS_DELETE: true,
				COMMUNITY_OWNER: isCommunityOwner,
				HOST_OWNER: true,
				COMMUNITY_USER_HAS_BANNED: false,
				COMMUNITY_USER_HAS_MUTED: false
			}
			return fullPermissions
		}

		// Проверяем, заглушён ли пользователь в сообществе
		const communityUsersMutes = await payload.find({
			collection: 'communityUsersMutes',
			where: {
				community: { equals: communityId },
				user: { equals: userId }
			},
			pagination: false,
			overrideAccess: true
		})

		const isMuted = communityUsersMutes.docs.length > 0

		// Проверяем, заблокирован ли пользователь в сообществе
		const communityUsersBans = await payload.find({
			collection: 'communityUsersBans',
			where: {
				community: { equals: communityId },
				user: { equals: userId }
			},
			pagination: false,
			overrideAccess: true
		})

		const isBanned = communityUsersBans.docs.length > 0

		// Если пользователь заблокирован, сбрасываем все права ролей
		if (isBanned) {
			const restrictedPermissions: Permissions = {
				COMMUNITY_ROLES_MANAGEMENT: false,
				COMMUNITY_USER_BAN: false,
				COMMUNITY_USER_MUTE: false,
				COMMUNITY_POST_DELETE: false,
				COMMUNITY_POST_REMOVE_FROM_PUBLICATION: false,
				COMMUNITY_COMMENTS_DELETE: false,
				COMMUNITY_OWNER: isCommunityOwner,
				HOST_OWNER: isHostOwner,
				COMMUNITY_USER_HAS_BANNED: true,
				COMMUNITY_USER_HAS_MUTED: isMuted
			}
			return restrictedPermissions
		}

		// Проверяем роли пользователя
		if (!user.communitiesRoles || !('docs' in user.communitiesRoles)) {
			return {
				...mergePermissions([]),
				COMMUNITY_OWNER: isCommunityOwner,
				HOST_OWNER: isHostOwner,
				COMMUNITY_USER_HAS_BANNED: isBanned,
				COMMUNITY_USER_HAS_MUTED: isMuted
			}
		}

		const rolesArray = user.communitiesRoles.docs as Role[]

		if (!Array.isArray(rolesArray) || rolesArray.length === 0) {
			return {
				...mergePermissions([]),
				COMMUNITY_OWNER: isCommunityOwner,
				HOST_OWNER: isHostOwner,
				COMMUNITY_USER_HAS_BANNED: isBanned,
				COMMUNITY_USER_HAS_MUTED: isMuted
			}
		}

		// Фильтруем роли по сообществу
		const userRolesInCommunity = rolesArray.filter(role => {
			const community =
				typeof role.community === 'object' ? role.community.id : role.community
			return community === communityId
		})

		// Объединяем права ролей
		const rolePermissions = mergePermissions(userRolesInCommunity)

		// Формируем полный объект разрешений
		const finalPermissions: Permissions = {
			...rolePermissions,
			COMMUNITY_OWNER: isCommunityOwner,
			HOST_OWNER: isHostOwner,
			COMMUNITY_USER_HAS_BANNED: isBanned,
			COMMUNITY_USER_HAS_MUTED: isMuted
		}

		return finalPermissions
	} catch (error) {
		throw error
	}
}
