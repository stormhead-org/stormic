// shared/lib/permissions.ts
import { Role } from '@/payload-types'

export type Permissions = {
	COMMUNITY_ROLES_MANAGEMENT: boolean
	COMMUNITY_USER_BAN: boolean
	COMMUNITY_USER_MUTE: boolean
	COMMUNITY_POST_DELETE: boolean
	COMMUNITY_POST_REMOVE_FROM_PUBLICATION: boolean
	COMMUNITY_COMMENTS_DELETE: boolean
	COMMUNITY_OWNER: boolean
	HOST_OWNER: boolean
	COMMUNITY_USER_HAS_BANNED: boolean
	COMMUNITY_USER_HAS_MUTED: boolean
}

// Тип для прав, зависящих только от ролей (без COMMUNITY_OWNER, HOST_OWNER и новых полей)
export type RolePermissions = Omit<
	Permissions,
	| 'community_owner'
	| 'host_owner'
	| 'community_user_has_banned'
	| 'community_user_has_muted'
>

export const mergePermissions = (roles: Role[]): RolePermissions => {
	const permissions: RolePermissions = {
		COMMUNITY_ROLES_MANAGEMENT: false,
		COMMUNITY_USER_BAN: false,
		COMMUNITY_USER_MUTE: false,
		COMMUNITY_POST_DELETE: false,
		COMMUNITY_POST_REMOVE_FROM_PUBLICATION: false,
		COMMUNITY_COMMENTS_DELETE: false,
		COMMUNITY_OWNER: false,
		HOST_OWNER: false,
		COMMUNITY_USER_HAS_BANNED: false,
		COMMUNITY_USER_HAS_MUTED: false
	}

	roles.forEach(role => {
		permissions.COMMUNITY_ROLES_MANAGEMENT ||=
			role.COMMUNITY_ROLES_MANAGEMENT ?? false
		permissions.COMMUNITY_USER_BAN ||= role.COMMUNITY_USER_BAN ?? false
		permissions.COMMUNITY_USER_MUTE ||= role.COMMUNITY_USER_MUTE ?? false
		permissions.COMMUNITY_POST_DELETE ||= role.COMMUNITY_POST_DELETE ?? false
		permissions.COMMUNITY_POST_REMOVE_FROM_PUBLICATION ||=
			role.COMMUNITY_POST_REMOVE_FROM_PUBLICATION ?? false
		permissions.COMMUNITY_COMMENTS_DELETE ||=
			role.COMMUNITY_COMMENTS_DELETE ?? false
	})

	return permissions
}
