import { Community } from '@/payload-types'
import { CommunitiesCardGroup } from '@/shared/components/communities/communities-card-group'
import { NewCommunityButton } from '@/shared/components/new-community-button'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function CommunitiesPage() {
	const payload = await getPayload({ config: configPromise })

	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 1
	})

	const resultCommunities = await payload.find({
		collection: 'communities',
		where: {
			COMMUNITY_HAS_BANNED: {
				equals: false
			}
		},
		pagination: false,
		overrideAccess: true
	})

	const communities = resultCommunities.docs as Community[]

	return (
		<>
			<div className='flex w-full gap-4'>
				<div className='w-8/12 bg-primary/10 rounded-md'></div>
				<div className='w-4/12'>
					<NewCommunityButton
						authImage={
							'hostAuthBanner' in resultGlobalHost &&
							typeof resultGlobalHost.hostAuthBanner === 'object' &&
							resultGlobalHost.hostAuthBanner !== null
								? resultGlobalHost.hostAuthBanner.url
								: ''
						}
						logoImage={
							'hostLogo' in resultGlobalHost &&
							typeof resultGlobalHost.hostLogo === 'object' &&
							resultGlobalHost.hostLogo !== null
								? resultGlobalHost.hostLogo.url
								: ''
						}
						stormicName={resultGlobalHost.hostTitle}
					/>
				</div>
			</div>
			<CommunitiesCardGroup data={communities || []} className='my-4' />
		</>
	)
}
