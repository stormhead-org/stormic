'use client'

import { ThemeProvider } from '@/shared/providers/items/ThemeProvider'
import React from 'react'
import { Toaster } from '../components/ui/sonner'
import { ModalProvider } from './items/ModalProvider'
import { QueryProvider } from './items/QueryProvider'
import SessionProvider from './items/SessionProvider'
import { SocketProvider } from './items/SocketProvider'

export const Providers: React.FC<{
	children: React.ReactNode
	session: any
}> = ({ children, session }) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
		>
		<SessionProvider session={session}>
					<SocketProvider>
						<QueryProvider>{children}</QueryProvider>
						<Toaster />
						<ModalProvider />
					</SocketProvider>
		</SessionProvider>
		</ThemeProvider>
	)
}
