import { User } from '@/payload-types'
import { AccountForm } from '@/shared/components/simple-pages/account-form'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function AccountPage() {
	const payload = await getPayload({ config: configPromise })

	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	const hostSettings = await payload.findGlobal({
		slug: 'host-settings',
		depth: 2
	})

	return (
		<>
			<AccountForm
				hostSettings={hostSettings}
				currentUser={currentUser !== null ? currentUser : undefined}
				className='m-2 lg:m-0'
			/>
		</>
	)
}
