'use client'

import React from 'react'
// import { useIntl } from 'react-intl'
import { Community, User } from '@/payload-types'
import { cn } from '@/shared/lib/utils'
import { useSession } from '@/shared/providers/SessionProvider'
import { GripHorizontal } from 'lucide-react'
import { SettingsCommunityModal } from '../../modals/communities/settings'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../../ui/dropdown-menu'

interface Props {
	data: User | Community
	hasUser: boolean
	className?: string
}

export const SettingsProfileButton: React.FC<Props> = ({
	data,
	hasUser,
	className
}) => {
	const session = useSession()
	const currentUser = session && (session.user as User)

	// const { formatMessage } = useIntl()
	const [openSettingsCommunityModal, setOpenSettingsCommunityModal] =
		React.useState(false)

	return (
		<div className={cn('', className)}>
			{!hasUser && (
				<SettingsCommunityModal
					data={data as Community}
					open={openSettingsCommunityModal}
					onClose={() => setOpenSettingsCommunityModal(false)}
				/>
			)}

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<GripHorizontal className='hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1' />
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' className='bg-secondary'>
					{!hasUser && (
						<DropdownMenuItem
							className='cursor-pointer'
							onClick={() => setOpenSettingsCommunityModal(true)}
						>
							{/* {formatMessage({ id: 'profileButton.profile' })} */}
							Настройки
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
