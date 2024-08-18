import { UserRoleType } from '@prisma/client'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			role: UserRoleType
			image?: string | null
		} & DefaultSession['user']
	}
}
