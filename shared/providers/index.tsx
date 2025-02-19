'use client'

import { Toaster } from '@/shared/components/ui/sonner'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'
import { HeaderThemeProvider } from './HeaderTheme'
import { ModalProvider } from './ModalProvider'
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
						<Toaster />
						<ModalProvider />
						<NextTopLoader />
					</SocketProvider>
				</HeaderThemeProvider>
			</ThemeProvider>
		</SessionProvider>
	)
}
