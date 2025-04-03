// page.tsx
import { User } from '@/payload-types'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import ModerationPanel from './ModerationPanel'

type Args = {
	params: {
		id?: number
	}
}

export default async function CommunitySettingsPage({
	params: paramsPromise
}: Args) {
	const communityId = await paramsPromise
	const session = (await getSession()) as { user: User } | null
	const currentUser = session?.user
	// const communityId = id

	if (!currentUser) {
		return <p>Войдите в систему</p>
	}

	const payload = await getPayload({ config: configPromise })
	const userWithRoles = await payload.findByID({
		collection: 'users',
		id: currentUser.id,
		depth: 2
	})

	return <ModerationPanel currentUser={userWithRoles} communityId={1} />
}
