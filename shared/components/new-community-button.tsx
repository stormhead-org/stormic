'use client'

import { AuthModal } from '@/shared/components/modals'
import { NewCommunityModal } from '@/shared/components/modals/new-community-modal'
import { WriteModal } from '@/shared/components/modals/write-modal'
import React from 'react'
import { useIntl } from 'react-intl'
import { cn } from '../lib/utils'
import { Button } from './ui/button'

interface Props {
	authorAvatar: string
	authorName: string
	authorUrl: string
	stormicName: string
	logoImage?: string
	authImage?: string
	hasSession: boolean
	className?: string
}

export const NewCommunityButton: React.FC<Props> = ({
	                                               authorAvatar,
	                                               authorName,
	                                               authorUrl,
	                                               logoImage,
	                                               authImage,
	                                               stormicName,
	                                               hasSession,
	                                               className
                                               }) => {
	const { formatMessage } = useIntl()
	const [openWriteModal, setopenWriteModal] = React.useState(false)
	const [openAuthModal, setOpenAuthModal] = React.useState(false)
	
	return (
		<div className={cn('', className)}>
			<NewCommunityModal
				open={openWriteModal}
				onClose={() => setopenWriteModal(false)}
			/>
			
			<AuthModal
				open={openAuthModal}
				onClose={() => setOpenAuthModal(false)}
				logoImage={logoImage}
				authImage={authImage}
				stormicName={stormicName}
			/>
			
			<Button
				variant='blue'
				className='h-12 w-full text-lg font-bold'
				type='button'
				onClick={hasSession ? () => setopenWriteModal(true) : () => setOpenAuthModal(true)}
			>
				Создать сообщество
			</Button>
		</div>
	)
}
