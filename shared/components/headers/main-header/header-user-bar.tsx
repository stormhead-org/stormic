'use client'

import type { Community, HostSetting, User } from '@/payload-types'
import { ProfileButton } from '@/shared/components'
import { NewPostButton } from '@/shared/components/new-post-button'
import { Button } from '@/shared/components/ui/button'
// import { LocaleToggle } from '@/shared/components/ui/locale-toggle'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AuthModal } from '../../modals'

interface Props {
	hostSettings: HostSetting
	communities: Community[]
	currentUser?: User
	className?: string
}

export const HeaderUserBar: React.FC<Props> = ({
	hostSettings,
	communities,
	currentUser,
	className
}) => {
	const [openAuthModal, setOpenAuthModal] = React.useState(false)
	const router = useRouter()

	const logoImageUrl =
		typeof hostSettings.logo === 'object'
			? getMediaUrl(hostSettings.logo, '/logo.png')
			: '/logo.png'

	const authImageUrl =
		typeof hostSettings.authBanner === 'object'
			? getMediaUrl(hostSettings.authBanner, '/defaultBanner.jpg')
			: '/defaultBanner.jpg'

	return (
		<div
			className={cn('flex items-center gap-3 w-[250px] justify-end', className)}
		>
			<AuthModal
				open={openAuthModal}
				onClose={() => setOpenAuthModal(false)}
				logoImage={logoImageUrl}
				authImage={authImageUrl}
				stormicName={hostSettings.title || 'Stormic'}
			/>

			{/* <LocaleToggle /> */}

			{/* <Notifications /> */}
			<Button
				variant='blue'
				type='button'
				className={cn(
					'w-10 h-10 bg-transparent hover:bg-secondary text-foreground rounded-xl p-0'
				)}
				onClick={() => router.push('/explore')}
			>
				<Search size={22} />
			</Button>

			<NewPostButton
				host={hostSettings}
				communities={communities}
				currentUser={currentUser !== null ? currentUser : undefined}
			/>

			<ProfileButton
				currentUser={currentUser}
				onClickSignIn={() => setOpenAuthModal(true)}
			/>
		</div>
	)
}
