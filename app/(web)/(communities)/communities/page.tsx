import { Community } from '@/payload-types'
import { CommunitiesCardGroup } from '@/shared/components/communities/communities-card-group'
import { NewCommunityButton } from '@/shared/components/new-community-button'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function CommunitiesPage() {
	const payload = await getPayload({ config: configPromise })

	const resultGlobalHost = await payload.findGlobal({
		slug: 'host-settings',
		depth: 2
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

	const authImage =
		typeof resultGlobalHost.authBanner === 'object'
			? getMediaUrl(resultGlobalHost.authBanner, '/logo.png')
			: '/logo.png'

	const logoImage =
		typeof resultGlobalHost.logo === 'object'
			? getMediaUrl(resultGlobalHost.logo, '/logo.png')
			: '/logo.png'

	return (
		<>
			<div className='flex w-full gap-4'>
				<div className='w-8/12 bg-primary/10 rounded-md'></div>
				<div className='w-4/12'>
					<NewCommunityButton
						authImage={authImage}
						logoImage={logoImage}
						stormicName={resultGlobalHost.title}
					/>
				</div>
			</div>
			<CommunitiesCardGroup data={communities || []} className='my-4' />
		</>
	)
}
