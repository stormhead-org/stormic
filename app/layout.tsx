'use client'

import { Providers } from '@/shared/components/providers/providers'
import YandexMetrika from '@/shared/components/yandex-metrika'
import { Nunito } from 'next/font/google'
import Script from 'next/script'
import React, { Suspense, useEffect, useState } from 'react'
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
	const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA
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
		<Script id='metrika-counter' strategy='afterInteractive'>
			{`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
 
              ym(${counterId}, "init", {
                    defer: true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
              });`
			}
		</Script>
		<Suspense fallback={<></>}>
			<YandexMetrika />
		</Suspense>
		
		<Providers>
			{children}
		</Providers>
		</body>
		</html>
	)
}
