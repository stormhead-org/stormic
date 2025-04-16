'use client'

import { Community, User } from '@/payload-types'
import { ProfileBody } from '@/shared/components/profiles/community-profiles-items/profile-body'
import { ProfileHeader } from '@/shared/components/profiles/community-profiles-items/profile-header'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { TeamCommunityModal } from '../../modals/communities/team'

interface Props {
	data: User | Community
	currentUser?: User
	permissions?: Permissions | null
	hasUser: boolean
	className?: string
}

export const ProfileItem: React.FC<Props> = ({
	data,
	currentUser,
	permissions,
	hasUser,
	className
}) => {
	const [openTeamCommunityModal, setOpenTeamCommunityModal] =
		React.useState(false)

	return (
		<div className={cn('', className)}>
			<div className='rounded-md bg-secondary'>
				{!hasUser && (
					<TeamCommunityModal
						data={data as Community}
						open={openTeamCommunityModal}
						onClose={() => setOpenTeamCommunityModal(false)}
					/>
				)}
				<ProfileHeader
					data={data}
					currentUser={currentUser}
					permissions={permissions}
					setOpenTeamCommunityModal={setOpenTeamCommunityModal}
					hasUser={hasUser}
				/>
				<ProfileBody
					data={data}
					setOpenTeamCommunityModal={setOpenTeamCommunityModal}
					hasUser={hasUser}
				/>
			</div>
		</div>
	)
}
