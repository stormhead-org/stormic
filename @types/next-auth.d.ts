// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import type { UserRoleType } from '@prisma/client'
import { DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			role: UserRoleType;
			name: string;
			image: string;
		};
	}
	
	interface User extends DefaultUser {
		id: number;
		role: UserRoleType;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		id: string;
		role: UserRoleType;
	}
}
