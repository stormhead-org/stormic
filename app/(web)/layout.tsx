import { User } from '@/payload-types'
import { Header } from '@/shared/components/headers/main-header/header'
import YandexMetrika from '@/shared/components/yandex-metrika'
import { getSession } from '@/shared/lib/auth'
import { getServerSideURL } from '@/shared/lib/getURL'
import { mergeOpenGraph } from '@/shared/lib/mergeOpenGraph'
import { Providers } from '@/shared/providers'
import { InitTheme } from '@/shared/providers/Theme/InitTheme'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Script from 'next/script'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import './globals.css'

export const metadata: Metadata = {
	metadataBase: new URL(getServerSideURL()),
	openGraph: mergeOpenGraph(),
	title: 'Stormic Community',
	twitter: {
		card: 'summary_large_image',
		creator: '@nimscore'
	}
}

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900']
})

export default async function HomeLayout({
	children
}: {
	children: React.ReactNode
}) {
	const payload = await getPayload({ config: configPromise })

	const session = (await getSession()) as { user: User } | null
	const user = session && session.user

	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings', // required
		depth: 1
	})

	const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<InitTheme />
				{/* <link href='/favicon.ico' rel='icon' sizes='32x32' />
				<link href='/favicon.svg' rel='icon' type='image/svg+xml'/> */}
			</head>
			<body className={nunito.className}>
				<Script id='metrika-counter' strategy='afterInteractive'>
					{counterId
						? `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${JSON.stringify(counterId)}, "init", {
          defer: true,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        });`
						: ''}
				</Script>
				<Suspense fallback={<></>}>
					<YandexMetrika />
				</Suspense>

				<Providers session={session}>
					<main className='min-h-screen'>
						<Suspense>
							<Header
								session={session ? true : false}
								logoImage={
									'hostLogo' in resultGlobalHost &&
									typeof resultGlobalHost.hostLogo === 'object' &&
									resultGlobalHost.hostLogo !== null
										? resultGlobalHost.hostLogo.url
										: ''
								}
								stormicName={resultGlobalHost.hostTitle}
								authImage={
									'hostAuthBanner' in resultGlobalHost &&
									typeof resultGlobalHost.hostAuthBanner === 'object' &&
									resultGlobalHost.hostAuthBanner !== null
										? resultGlobalHost.hostAuthBanner.url
										: ''
								}
								description={resultGlobalHost.hostSlogan}
								avatarImage={
									user &&
									'userAvatar' in user &&
									typeof user.userAvatar === 'object' &&
									user.userAvatar !== null
										? user.userAvatar.url
										: ''
								}
								userUrl={`/u/${session?.user.id}`}
							/>
						</Suspense>
						{children}
						{/* {modal} */}
					</main>
				</Providers>
			</body>
		</html>
	)
}
