import { prisma } from '@/prisma/prisma-client'
import { UserSubscriptionsPostGroup } from '@/shared/components/posts/user-subscriptions-post-group'
import { getUserSession } from '@/shared/lib'
import { redirect } from 'next/navigation'

export default async function myPage() {
	
	const session = await getUserSession()
	
	if (!session) {
		return redirect('/not-auth')
	}
	
	const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } })
	
	if (!user) {
		return redirect('/not-auth')
	}
	return (
		<>
			<UserSubscriptionsPostGroup userId={String(user.id)} />
		</>
	)
}
