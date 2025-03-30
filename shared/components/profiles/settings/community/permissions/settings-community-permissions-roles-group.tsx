'use client'

import { Community, Role } from '@/payload-types'
import { Container, Title } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Users, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import { MainForm } from './forms/main-form'

interface Props {
	data: Community
	totalRoles: number
}

export const SettingsCommunityPermissionsRolesGroup: React.FC<Props> = ({
	data,
	totalRoles
}) => {
	const [type, setType] = React.useState<
		'main' | 'visual' | 'permissions' | 'users'
	>('main')

	return (
		<div className='flex flex-col gap-4'>
			{type === 'main' && (
				<MainForm data={data} totalRoles={totalRoles} setType={setType} />
			)}
		</div>
	)
}
