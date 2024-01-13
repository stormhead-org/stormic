import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ReduxProvider } from '../../redux/providers'
import '../../styles/globals.scss'

// class FetchClient {
// 	private LANG = process.env.LANG as string
// }
// console.log(SITE_LANG)
const SITE_LANG = process.env.LANG as string

const montserrat = Montserrat({ subsets: ['cyrillic', 'latin'] })

export const metadata: Metadata = {
	title: 'Fatum',
	description: 'Единое решение для Ваших сообществ!'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<ReduxProvider>
				<html lang='ru'>
					<body className={montserrat.className}>{children}</body>
				</html>
			</ReduxProvider>
		</>
	)
}
