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
		sort: 'id',
		pagination: false,
		overrideAccess: true
	})

	const communities = resultCommunities.docs as Community[]

	const authImage =
		typeof resultGlobalHost.authBanner === 'object'
			? getMediaUrl(resultGlobalHost.authBanner, 'medium', '/defaultBanner.jpg')
			: '/defaultBanner.jpg'

	const logoImage =
		typeof resultGlobalHost.logo === 'object'
			? getMediaUrl(resultGlobalHost.logo, 'medium', '/logo.png')
			: '/logo.png'

	return (
		<>
			<div className='lg:flex lg:w-full lg:gap-2'>
				<div className='hidden lg:block w-3/4 bg-secondary rounded-xl' />
				<div className='w-full lg:w-1/4 mb-2 lg:mb-0'>
					<NewCommunityButton
						authImage={authImage}
						logoImage={logoImage}
						stormicName={resultGlobalHost.title}
						className='mx-2 lg:mx-0'
					/>
				</div>
			</div>
			<CommunitiesCardGroup
				data={communities || []}
				className='mb-2 lg:mb-0 lg:mt-2'
			/>
		</>
	)
}
