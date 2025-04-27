'use client'

import { Community, HostSetting, User } from '@/payload-types'
import { AuthModal } from '@/shared/components/modals'
import React from 'react'
// import { useIntl } from 'react-intl'
import { cn } from '../lib/utils'
import { getMediaUrl } from '../utils/payload/getTypes'
import { PostEditModal } from './modals/post-edit-modal'
import { Button } from './ui/button'

interface Props {
	host: HostSetting
	communities: Community[]
	currentUser?: User
	className?: string
}

export const NewPostButton: React.FC<Props> = ({
	host,
	communities,
	currentUser,
	className
}) => {
	// const { formatMessage } = useIntl()
	const [openEditModal, setOpenEditModal] = React.useState(false)
	const [openAuthModal, setOpenAuthModal] = React.useState(false)

	const authorAvatarUrl =
		typeof currentUser?.avatar === 'object'
			? getMediaUrl(currentUser.avatar, '/logo.png')
			: '/logo.png'

	const logoImageUrl =
		typeof host.logo === 'object'
			? getMediaUrl(host.logo, '/logo.png')
			: '/logo.png'

	const authImageUrl =
		typeof host.authBanner === 'object'
			? getMediaUrl(host.authBanner, '/defaultBanner.jpg')
			: '/defaultBanner.jpg'

	return (
		<div className={cn('', className)}>
			{currentUser ? (
				<PostEditModal
					communities={communities}
					currentUser={currentUser}
					open={openEditModal}
					onClose={() => setOpenEditModal(false)}
				/>
			) : (
				<AuthModal
					open={openAuthModal}
					onClose={() => setOpenAuthModal(false)}
					logoImage={logoImageUrl}
					authImage={authImageUrl}
					stormicName={host.title || 'Stormic'}
				/>
			)}

			<Button
				variant='blue'
				className='text-base font-bold rounded-2xl'
				type='button'
				onClick={
					currentUser
						? () => setOpenEditModal(true)
						: () => setOpenAuthModal(true)
				}
			>
				{/* {formatMessage({ id: 'newPostButton' })} */}
				<span>Написать</span>
			</Button>
		</div>
	)
}
