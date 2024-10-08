'use client'

import { LocaleProvider, useLocale } from '@/shared/components/providers/items/locale-provider'
import { ModalProvider } from '@/shared/components/providers/items/modal-provider'
import { QueryProvider } from '@/shared/components/providers/items/query-provider'
import { SocketProvider } from '@/shared/components/providers/items/socket-provider'
import { Toaster } from '@/shared/components/ui/sonner'
import { messages } from '@/shared/lib/messages'
import { SessionProvider } from 'next-auth/react'

import dynamic from 'next/dynamic'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'
import { IntlProvider } from 'react-intl'

{
	/*The Warning: Extra attributes from the server: class,style error occurs when server-side rendering (SSR) 
generates HTML with attributes that do not match the client-side rendering. 
This can happen if you are using ThemeProvider for theme management and it adds class and style 
attributes to elements that have not been pre-rendered on the server.

To fix this error, you need to make sure that the class and style attributes on the server and on 
the client match.

Using next/dynamic to dynamically load ThemeProvider solves the problem
*/
}

const ThemeProvider = dynamic(
	() => import('../theme-provider').then(mod => mod.ThemeProvider),
	{
		ssr: false
	}
)

interface ProvidersProps {
	children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
	return (
		<LocaleProvider>
			<IntlProviderWrapper>
				<ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
					<SessionProvider>
						<SocketProvider>
							<QueryProvider>
								{children}
							</QueryProvider>
							<Toaster />
							<NextTopLoader />
							<ModalProvider />
						</SocketProvider>
					</SessionProvider>
				</ThemeProvider>
			</IntlProviderWrapper>
		</LocaleProvider>
	)
}

const IntlProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
	                                                                      children
                                                                      }) => {
	const { locale } = useLocale()
	
	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			{children}
		</IntlProvider>
	)
}
