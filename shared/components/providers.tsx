'use client'

import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './theme-provider'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<>
			<ThemeProvider
				attribute='class'
				defaultTheme='dark'
				enableSystem
				// disableTransitionOnChange
			>
				<SessionProvider>{children}</SessionProvider>
				<Toaster />
				<NextTopLoader />
			</ThemeProvider>
		</>
	)
}
