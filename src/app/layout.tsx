import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Header from '../../components/ui/header/Header'
import '../../styles/globals.scss'

const montserrat = Montserrat({ subsets: ['cyrillic', 'latin'] })

export const metadata: Metadata = {
	title: 'Mustel',
	description: 'Единое решение для Ваших сообществ!'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<body className={montserrat.className}>
				<Header />
				{children}
			</body>
		</html>
	)
}
