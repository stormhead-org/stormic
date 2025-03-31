'use client'

import { Community, Role } from '@/payload-types'
import React, { useState } from 'react'
import { MainForm } from './forms/main-form'
import { VisualForm } from './forms/vasual-form'

interface Props {
	data: Community
	communityRoles: Role[]
}

export const SettingsCommunityPermissionsRolesGroup: React.FC<Props> = ({
	data,
	communityRoles
}) => {
	const [type, setType] = React.useState<
		'main' | 'visual' | 'permissions' | 'users'
	>('main')

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
			{type === 'visual' && (
				<VisualForm
					data={data}
					communityRoles={communityRoles}
					setType={setType}
					selectedRoleId={selectedRoleId}
					setSelectedRoleId={setSelectedRoleId}
				/>
			)}
		</div>
	)
}
