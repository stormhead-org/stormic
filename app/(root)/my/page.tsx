import { prisma } from '@/prisma/prisma-client'
import { MainBannerForm } from '@/shared/components'
import { UserSubscriptionsPostGroup } from '@/shared/components/posts/user-subscriptions-post-group'
import { getUserSession } from '@/shared/lib'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Stormic: Моя лента'
}

export default async function myPage() {
	
	const session = await getUserSession()
	
	if (!session) {
		return redirect('/not-auth')
	}
	
	const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } })
	
	if (!user) {
		return redirect('/not-auth')
	}
	
	const stormicName = await prisma.stormicSettings.findFirst({
		where: {
			settingsType: 'NAME'
		}
	})
	const banner = await prisma.stormicMedia.findFirst({
		where: {
			mediaType: 'BANNER'
		}
	})
	
	return (
		<>
			<MainBannerForm stormicName={stormicName && String(stormicName.content)}
			                bannerUrl={banner && String(banner.url)} />
			<UserSubscriptionsPostGroup userId={String(user.id)} />
		</>
	)
}
