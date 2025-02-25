import { Community } from '@/payload-types'
import { CommunitiesCardGroup } from '@/shared/components/communities/communities-card-group'
import { NewCommunityButton } from '@/shared/components/new-community-button'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function CommunitiesPage() {
	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: 'communities',
		depth: 1,
		overrideAccess: false
	})

	const communities = result.docs as Community[]

	return (
		<>
			<div className='flex w-full gap-4'>
				<div className='w-8/12 bg-primary/10 rounded-md'></div>
				<div className='w-4/12'>
					<NewCommunityButton
						authorAvatar={''}
						authorName={''}
						authorUrl={''}
						stormicName={''}
						hasSession={true}
					/>
				</div>
			</div>
			<CommunitiesCardGroup data={communities || []} className='my-4' />
		</>
	)
}
