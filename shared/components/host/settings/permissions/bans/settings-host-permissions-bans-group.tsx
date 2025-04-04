'use client'

import {
	Community,
	HostCommunitiesBan,
	HostUsersBan,
	User
} from '@/payload-types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { CommunitiesBanForm } from './forms/communities-ban-form'
import { UsersBanForm } from './forms/users-ban-form'

interface Props {
	currentUser: User
	users: User[]
	hostUsersBans: HostUsersBan[]
	communities: Community[]
	hostCommunitiesBans: HostCommunitiesBan[]
}

export const SettingsHostPermissionsBansGroup: React.FC<Props> = ({
	currentUser,
	users,
	hostUsersBans,
	communities,
	hostCommunitiesBans
}) => {
	const router = useRouter()
	const [type, setType] = React.useState<'users' | 'communities'>('users')

	return (
		<>
			{type === 'users' && (
				<UsersBanForm
					currentUser={currentUser}
					users={users}
					hostUsersBans={hostUsersBans}
					setType={setType}
				/>
			)}
			{type === 'communities' && (
				<CommunitiesBanForm
					communities={communities}
					hostCommunitiesBans={hostCommunitiesBans}
					setType={setType}
				/>
			)}
		</>
	)
}
