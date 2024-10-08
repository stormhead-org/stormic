'use client'

import { Providers } from '@/shared/components/providers/providers'
import { Nunito } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import 'photoswipe/dist/photoswipe.css'
import './globals.css'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900']
})

export default function RootLayout({
	                                   children
                                   }: Readonly<{
	children: React.ReactNode
}>) {
	
	const [locale, setLocale] = useState<string>('en')
	
	useEffect(() => {
		const userLang = navigator.language.split('-')[0] || 'en' // Нормализация локали
		setLocale(userLang)
	}, [])
	
	return (
		<html lang={locale}>
		<head>
			<link data-rh='true' rel='icon' href='/favicon.ico' />
		</head>
		<body className={nunito.className}>
		<Providers>
			{children}
		</Providers>
		</body>
		</html>
	)
}
