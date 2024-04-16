import { ModalProvider } from '@/components/(community)/providers/modal-provider'
import { QueryProvider } from '@/components/(community)/providers/query-provider'
import { SocketProvider } from '@/components/(community)/providers/socket-provider'
import { ThemeProvider } from '@/components/(community)/providers/theme-provider'
import { ruRU } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Fatum',
	description: 'Единое решение для Ваших задач',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider localization={ruRU}>
			<html lang='en' suppressHydrationWarning>
				<body className={font.className}>
					<ThemeProvider
						attribute='class'
						defaultTheme='dark'
						enableSystem={false}
						storageKey='fatum-theme'
					>
						<SocketProvider>
							<ModalProvider />
							<QueryProvider>{children}</QueryProvider>
						</SocketProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
