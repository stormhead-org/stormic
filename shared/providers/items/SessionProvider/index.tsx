'use client'

import { createContext, useContext } from 'react'

type Session = {
	user: {
		id: number
		name: string
		email: string
		userAvatar?: {
			url: string
			thumbnailURL: string
		}
	}
	token: string
} | null

const SessionContext = createContext<Session | null>(null)

export default function SessionProvider({
	session,
	children
}: {
	session: Session
	children: React.ReactNode
}) {
	return (
		<SessionContext.Provider value={session}>
			{children}
		</SessionContext.Provider>
	)
}

export function useSession() {
	const session = useContext(SessionContext)
	return session
}
