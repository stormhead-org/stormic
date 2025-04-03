'use client'

import { Community, FollowCommunity, Role } from '@/payload-types'
import React, { useState } from 'react'
import { EditorForm } from './forms/editor-form'
import { MainForm } from './forms/main-form'

interface Props {
	data: Community
	communityRoles: Role[]
	communityUsers: FollowCommunity[]
}

export const SettingsHostPermissionsRolesGroup: React.FC<Props> = ({
	data,
	communityRoles,
	communityUsers
}) => {
	const [type, setType] = React.useState<'main' | 'editor'>('main')

	const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null)

	return (
		<div className='flex flex-col gap-4'>
			{type === 'main' && (
				<MainForm
					data={data}
					communityRoles={communityRoles}
					setType={setType}
					selectedRoleId={selectedRoleId}
					setSelectedRoleId={setSelectedRoleId}
				/>
			)}
			{type === 'editor' && (
				<EditorForm
					data={data}
					communityRoles={communityRoles}
					communityUsers={communityUsers}
					setType={setType}
					selectedRoleId={selectedRoleId}
					setSelectedRoleId={setSelectedRoleId}
				/>
			)}
		</div>
	)
}
