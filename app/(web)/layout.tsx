import { Community, User } from '@/payload-types'
import { Header } from '@/shared/components/headers/main-header/header'
import { UserBanLogin } from '@/shared/components/info-blocks/user-ban-login'
import { MobileBottomNavBar } from '@/shared/components/mobile/mobile-bottom-nav-bar'
import YandexMetrika from '@/shared/components/yandex-metrika'
import { getSession } from '@/shared/lib/auth'
import { getServerSideURL } from '@/shared/lib/getURL'
import { mergeOpenGraph } from '@/shared/lib/mergeOpenGraph'
import { Providers } from '@/shared/providers'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
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
	const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA
	const payload = await getPayload({ config: configPromise })
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	const sideBarNavigation = await payload.findGlobal({
		slug: 'sidebar-navigation',
		depth: 1,
		select: {
			items: true
		}
	})

	const socialNavigation = await payload.findGlobal({
		slug: 'social-navigation',
		depth: 2
	})

	const resultCommunities = await payload.find({
		collection: 'communities',
		where: {
			COMMUNITY_HAS_BANNED: {
				equals: false
			}
		},
		depth: 2,
		pagination: false,
		overrideAccess: false
	})

	const communities = resultCommunities.docs as Community[]

	// Базовая разметка, которая будет использоваться в обоих случаях
	const baseLayout = (content: React.ReactNode) => (
		<html lang='en' suppressHydrationWarning>
			<head>
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
					<main className='min-h-screen'>{content}</main>
				</Providers>
			</body>
		</html>
	)

	// Если пользователь не авторизован
	if (!currentUser) {
		const resultGlobalHost = await payload.findGlobal({
			slug: 'host-settings',
			depth: 1
		})

		const logoImageUrl =
			typeof resultGlobalHost.logo === 'object'
				? getMediaUrl(resultGlobalHost.logo, '/logo.png')
				: '/logo.png'

		const authImageUrl =
			typeof resultGlobalHost.authBanner === 'object'
				? getMediaUrl(resultGlobalHost.authBanner, '/defaultBanner.jpg')
				: '/defaultBanner.jpg'

		return baseLayout(
			<>
				<Suspense>
					<Header
						communities={communities}
						sideBarNavigation={sideBarNavigation}
						socialNavigation={socialNavigation}
						session={false}
						logoImage={logoImageUrl}
						stormicName={resultGlobalHost.title || 'Stormic'}
						authImage={authImageUrl}
						description={resultGlobalHost.slogan || 'код, GitHub и ты'}
						avatarImage=''
						userUrl=''
					/>
				</Suspense>
				{children}
				<div className='sticky bottom-0 lg:hidden'>
					<MobileBottomNavBar />
				</div>
			</>
		)
	}

	// Если пользователь авторизован, проверяем бан
	const hostUserBan = await payload.find({
		collection: 'hostUsersBans',
		where: {
			user: {
				equals: currentUser.id
			}
		},
		pagination: false,
		overrideAccess: true
	})

	// Если пользователь забанен
	if (hostUserBan.docs.length > 0) {
		return baseLayout(<UserBanLogin className='mt-24' />)
	}

	// Если пользователь авторизован и не забанен
	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 1
	})

	const logoImageUrl =
		typeof resultGlobalHost.logo === 'object'
			? getMediaUrl(resultGlobalHost.logo, '/logo.png')
			: '/logo.png'

	const authImageUrl =
		typeof resultGlobalHost.authBanner === 'object'
			? getMediaUrl(resultGlobalHost.authBanner, '/defaultBanner.jpg')
			: '/defaultBanner.jpg'

	const avatarImageUrl =
		typeof currentUser.avatar === 'object'
			? getMediaUrl(currentUser.avatar, '/logo.png')
			: '/logo.png'

	return baseLayout(
		<>
			<Suspense>
				<Header
					communities={communities}
					sideBarNavigation={sideBarNavigation}
					socialNavigation={socialNavigation}
					session={true}
					logoImage={logoImageUrl}
					stormicName={resultGlobalHost.title || 'Stormic'}
					authImage={authImageUrl}
					description={resultGlobalHost.slogan || 'код, GitHub и ты'}
					avatarImage={avatarImageUrl}
					userUrl={`/u/${session?.user.id}`}
				/>
			</Suspense>
			{children}
			<div className='sticky bottom-0 lg:hidden'>
				<MobileBottomNavBar />
			</div>
		</>
	)
}
