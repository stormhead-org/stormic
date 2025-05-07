'use client'

import { Community, HostSetting, User } from '@/payload-types'
import { AuthModal } from '@/shared/components/modals'
import { MobileNewCommentDrawer } from '@/shared/components/modals/mobile-new-comment-drawer'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import React from 'react'

interface Props {
	host: HostSetting
	apiUrl: string
	query: Record<string, any>
	currentUser?: User
	className?: string
}

export const MobileNewCommentButton: React.FC<Props> = ({
	host,
	apiUrl,
	query,
	currentUser,
	className
}) => {
	// const { formatMessage } = useIntl()
	const [openNewCommentModal, setOpenNewCommentModal] = React.useState(false)
	const [openAuthModal, setOpenAuthModal] = React.useState(false)

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
				<MobileNewCommentDrawer
					apiUrl={apiUrl}
					query={query}
					open={openNewCommentModal}
					onClose={() => setOpenNewCommentModal(false)}
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
				className='w-full h-12 mt-2 text-base font-bold rounded-xl text-background'
				type='button'
				onClick={
					currentUser
						? () => setOpenNewCommentModal(true)
						: () => setOpenAuthModal(true)
				}
			>
				{/* {formatMessage({ id: 'newPostButton' })} */}
				<span>Комментировать</span>
			</Button>
		</div>
	)
}
