import { HostUsersBan, User } from '@/payload-types'
import { UsersCardGroup } from '@/shared/components/users/users-card-group'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function UsersPage() {
	const payload = await getPayload({ config: configPromise })

	const resultUsers = await payload.find({
		collection: 'users',
		pagination: false,
		overrideAccess: true,
		sort: 'id'
	})

	const resultHostUsersBans = await payload.find({
		collection: 'hostUsersBans',
		pagination: false,
		depth: 0
	})

	const usersArray = resultUsers.docs as User[]
	const hostUsersBans = resultHostUsersBans.docs as HostUsersBan[]

	// Создаем Set с ID забаненных пользователей
	const bannedUserIds = new Set(hostUsersBans.map(ban => ban.user as number))

	// Фильтруем пользователей, исключая тех, чьи ID есть в bannedUserIds
	const users = usersArray.filter(user => !bannedUserIds.has(user.id))

	return (
		<>
			{/* <div className='flex w-full gap-4'>
				<div className='w-8/12 bg-primary/10 rounded-md'></div>
				<div className='w-4/12'>
					<NewCommunityButton
						authImage={authImage}
						logoImage={logoImage}
						stormicName={resultGlobalHost.title}
					/>
				</div>
			</div> */}
			<UsersCardGroup data={users || []} className='my-0 lg:my-4' />
		</>
	)
}
