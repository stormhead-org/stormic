'use client'

import { AuthModal } from '@/shared/components/modals'
import { NewCommunityModal } from '@/shared/components/modals/new-community-modal'
import React from 'react'
// import { useIntl } from 'react-intl'
import { User } from '@/payload-types'
import { cn } from '../lib/utils'
import { useSession } from '../providers/SessionProvider'
import { Button } from './ui/button'

interface Props {
	logoImage: string | null | undefined
	stormicName: string | null | undefined
	authImage?: string | null | undefined
	className?: string
}

export const NewCommunityButton: React.FC<Props> = ({
	logoImage,
	authImage,
	stormicName,
	className
}) => {
	const session = useSession()
	const currentUser = session && (session.user as User)

	// const { formatMessage } = useIntl()
	const [openCreateCommunityModal, setOpenCreateCommunityModal] =
		React.useState(false)
	const [openAuthModal, setOpenAuthModal] = React.useState(false)

	return (
		<div className={cn('', className)}>
			{currentUser ? (
				<NewCommunityModal
					userId={currentUser.id}
					open={openCreateCommunityModal}
					onClose={() => setOpenCreateCommunityModal(false)}
				/>
			) : (
				<AuthModal
					open={openAuthModal}
					onClose={() => setOpenAuthModal(false)}
					logoImage={logoImage || ''}
					authImage={authImage || ''}
					stormicName={stormicName || ''}
				/>
			)}

			<Button
				variant='blue'
				className='h-12 w-full text-lg font-bold'
				type='button'
				onClick={
					currentUser
						? () => setOpenCreateCommunityModal(true)
						: () => setOpenAuthModal(true)
				}
			>
				Создать сообщество
			</Button>
		</div>
	)
}
