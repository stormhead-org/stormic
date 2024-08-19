import { prisma } from '@/prisma/prisma-client'
import { HeaderForm } from '@/shared/components'
import { getUserSession } from '@/shared/lib'

export default async function Header() {
	const session = await getUserSession()
	
	// Получаем данные пользователя, если сессия активна
	const user = session
		? await prisma.user.findFirst({ where: { id: Number(session?.id) } })
		: null
	
	// Получаем логотип, имя и описание
	const logoImage = await prisma.stormicMedia.findFirst({
		where: {
			mediaType: 'LOGO'
		}
	})
	
	const stormicName = await prisma.stormicSettings.findFirst({
		where: {
			settingsType: 'NAME'
		}
	})
	
	const description = await prisma.stormicSettings.findFirst({
		where: {
			settingsType: 'DESCRIPTION'
		}
	})
	
	return (
		<HeaderForm
			avatarImage={user?.profile_picture ? String(user.profile_picture) : ''}
			logoImage={logoImage?.url ? String(logoImage.url) : ''}
			stormicName={stormicName?.content ? String(stormicName.content) : ''}
			description={description?.content ? String(description.content) : ''}
		/>
	)
}
