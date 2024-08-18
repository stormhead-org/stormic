import { prisma } from '@/prisma/prisma-client'
import { UserBookmarksPostGroup } from '@/shared/components/posts/user-bookmarks-post-group'
import { getUserSession } from '@/shared/lib'
import { redirect } from 'next/navigation'

export default async function bookmarksPage() {
	
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
			<UserBookmarksPostGroup userId={String(user.id)} />
		</>
	)
}
