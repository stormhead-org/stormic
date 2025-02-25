import { User } from '@/payload-types'
import { FieldHook } from 'payload'
// у всех юзеров должна быть роль everyone
// не админы не могут менять роль
export const protectRoles: FieldHook<{ id: string } & User> = ({
	data,
	req
}) => {
	const isOwner =
		req.user?.systemRoles.includes('owner') ||
		data.email === 'nims@stormhead.org'

	if (!isOwner) {
		return ['user']
	}

	const userRoles = new Set(data?.systemRoles || [])
	userRoles.add('everyone')
	return [...userRoles]
}
