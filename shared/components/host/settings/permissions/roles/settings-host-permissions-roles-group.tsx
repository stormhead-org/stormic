'use client'

import { HostRole, HostSetting, User } from '@/payload-types'
import React, { useState } from 'react'
import { EditorForm } from './forms/editor-form'
import { MainForm } from './forms/main-form'

interface Props {
	data: HostSetting
	hostRoles: HostRole[]
	users: User[]
}

export const SettingsHostPermissionsRolesGroup: React.FC<Props> = ({
	data,
	hostRoles,
	users
}) => {
	const [type, setType] = React.useState<'main' | 'editor'>('main')

	const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null)

	return (
		<div className='flex flex-col gap-4'>
			{type === 'main' && (
				<MainForm
					data={data}
					hostRoles={hostRoles}
					setType={setType}
					selectedRoleId={selectedRoleId}
					setSelectedRoleId={setSelectedRoleId}
				/>
			)}
			{type === 'editor' && (
				<EditorForm
					data={data}
					hostRoles={hostRoles}
					users={users}
					setType={setType}
					selectedRoleId={selectedRoleId}
					setSelectedRoleId={setSelectedRoleId}
				/>
			)}
		</div>
	)
}
