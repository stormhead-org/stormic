'use client'

import React from 'react'
import { HeaderThemeProvider } from './HeaderTheme'
import { QueryProvider } from './QueryProvider'
import SessionProvider from './SessionProvider'
import { SocketProvider } from './SocketProvider'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
	children: React.ReactNode
	session: any
}> = ({ children, session }) => {
	return (
		<SessionProvider session={session}>
			<ThemeProvider>
				<HeaderThemeProvider>
					<SocketProvider>
						<QueryProvider>{children}</QueryProvider>
					</SocketProvider>
				</HeaderThemeProvider>
			</ThemeProvider>
		</SessionProvider>
	)
}
