import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Stormic: Профиль'
}

export default async function SettingHostRedirect() {
	// const session = (await getSession()) as { user: User } | null
	// const currentUser = session && session.user
	//
	// if (!currentUser) {
	// 	return redirect('/')
	// }
	//
	// const payload = await getPayload({ config: configPromise })
	//
	// const community = await queryCommunityById({ id })
	//
	// if (!community) {
	// 	return <CommunityNotFound />
	// }
	//
	// const user = await payload.findByID({
	// 	collection: 'users',
	// 	id: currentUser.id,
	// 	depth: 2
	// })
	//
	// if (!user) {
	// 	return <UserNotFound />
	// }

	return redirect(`/settings/host/main`)
}


// const queryCommunityById = cache(async ({ id }: { id: number | null }) => {
// 	if (!id) return null
//
// 	const payload = await getPayload({ config: configPromise })
//
// 	const community = await payload.findByID({
// 		collection: 'communities',
// 		id: id,
// 		depth: 2
// 	})
//
// 	return community || null
// })
