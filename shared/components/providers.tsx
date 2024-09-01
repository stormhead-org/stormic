'use client'

import { LocaleProvider, useLocale } from '@/shared/components/locale-provider'
import { Toaster } from '@/shared/components/ui/sonner'
import { messages } from '@/shared/lib/messages'
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from './theme-provider'

interface ProvidersProps {
	children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
	return (
		<LocaleProvider>
			<IntlProviderWrapper>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
				>
					<SessionProvider>{children}</SessionProvider>
					<Toaster />
					<NextTopLoader />
				</ThemeProvider>
			</IntlProviderWrapper>
		</LocaleProvider>
	)
}

const IntlProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { locale } = useLocale()
	
	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			{children}
		</IntlProvider>
	)
}
