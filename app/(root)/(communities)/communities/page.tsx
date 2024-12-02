'use client'

import { NewPostButton } from '@/shared/components'
import { CommunitiesCardGroup } from '@/shared/components/communities/communities-card-group'
import { NewCommunityButton } from '@/shared/components/new-community-button'
import React from 'react'

export default function CommunitiesPage() {
	return (
		<>
			<div className='flex w-full gap-4'>
				<div className='w-8/12 bg-primary/10 rounded-md'>
				
				</div>
				<div className='w-4/12'>
					<NewCommunityButton authorAvatar={''} authorName={''} authorUrl={''} stormicName={''} hasSession={true} />
				</div>
			</div>
			<CommunitiesCardGroup className='my-4' />
		</>
	)
}
