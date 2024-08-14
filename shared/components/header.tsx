import { prisma } from '@/prisma/prisma-client';
import { HeaderForm } from '@/shared/components'
import { getUserSession } from '@/shared/lib';

export default async function Header() {
	
	const session = await getUserSession();
	
	const avatarImage = session ? (
		await prisma.user.findFirst({ where: { id: Number(session?.id) } })
	) : null
	
	const logoImage = await prisma.stormicMedia.findFirst({
		where: {
			mediaType: 'LOGO',
		},
	})
	
	const stormicName = await prisma.stormicSettings.findFirst({
		where: {
			settingsType: 'NAME',
		},
	})
	
	const description = await prisma.stormicSettings.findFirst({
		where: {
			settingsType: 'DESCRIPTION',
		},
	})
	
	return <HeaderForm avatarImage={ !session ? ('') : (String(avatarImage.profile_picture)) } logoImage={String(logoImage.url)} stormicName={String(stormicName.content)} description={String(description.content)} />
}
