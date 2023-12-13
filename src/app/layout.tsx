import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import '../../styles/globals.scss'

const montserrat = Montserrat({ subsets: ['cyrillic', 'latin'] })

export const metadata: Metadata = {
	title: 'Mustel',
	description: 'Единое решение для Ваших сообществ!'
}

class FetchClient {
	private LANG = process.env.LANG as string
}

export default function RootLayout({
	children,
	login
}: {
	children: React.ReactNode
	login: React.ReactNode
}) {
	async function onClose() {
		'use server'
		console.log('Modal has closed')
	}

	async function onOk() {
		'use server'
		console.log('Ok was clicked')
	}

	return (
		<>
			<html lang='ru'>
				<body className={montserrat.className}>
					{/* <Modal title='Example Modal' onClose={onClose} onOk={onOk}>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
							eligendi odio ipsa nostrum dolores voluptas architecto tempore
							nulla voluptatibus vel, placeat explicabo exercitationem id
							officia laborum doloremque blanditiis earum accusamus.
						</p>
					</Modal> */}
					{children}
					{login}
				</body>
			</html>
		</>
	)
}
