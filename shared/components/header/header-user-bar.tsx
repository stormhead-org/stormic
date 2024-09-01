'use client'

import { Notifications, ProfileButton } from '@/shared/components'
import { LocaleToggle } from '@/shared/components/ui/locale-toggle'
import { ModeToggle } from '@/shared/components/ui/mode-toggle'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { AuthModal } from '../modals'

interface Props {
	userUrl: string
	avatarImage: string
	className?: string
}

export const HeaderUserBar: React.FC<Props> = ({ userUrl, avatarImage, className }) => {
	
	const [openAuthModal, setOpenAuthModal] = React.useState(false)
	
	return (
		<div className={cn('flex items-center gap-3 w-[250px] justify-end', className)}>
			<AuthModal
				open={openAuthModal}
				onClose={() => setOpenAuthModal(false)}
			/>
			
			<LocaleToggle />
			
			<ModeToggle />
			
			<Notifications />
			
			<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} avatarImage={avatarImage} userUrl={userUrl} />
		</div>
	)
}
