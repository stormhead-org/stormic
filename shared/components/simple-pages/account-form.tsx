'use client'

import { HostSetting, User } from '@/payload-types'
import { SideFooter } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { CircleUser } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AuthModal } from '../modals'
import { ModeToggle } from '../ui/ModeToggle'
import { Avatar, AvatarFallback } from '../ui/avatar'

// import { useIntl } from 'react-intl'

interface Props {
	hostSettings: HostSetting
	currentUser?: User
	className?: string
}

export const AccountForm: React.FC<Props> = ({
	hostSettings,
	currentUser,
	className
}) => {
	const [openAuthModal, setOpenAuthModal] = React.useState(false)
	const router = useRouter()

	const authImage =
		typeof hostSettings.authBanner === 'object'
			? getMediaUrl(hostSettings.authBanner, '/defaultBanner.jpg')
			: '/defaultBanner.jpg'

	const logoImage =
		typeof hostSettings.logo === 'object'
			? getMediaUrl(hostSettings.logo, '/logo.png')
			: '/logo.png'

	return (
		<div className={cn('', className)}>
			<AuthModal
				open={openAuthModal}
				onClose={() => setOpenAuthModal(false)}
				logoImage={logoImage}
				authImage={authImage}
				stormicName={hostSettings.title || 'Stormic'}
			/>

			<div className='flex items-center justify-between w-full h-12 text-base font-medium bg-transparent hover:bg-secondary text-primary rounded-xl cursor-pointer px-3'>
				<div
					onClick={() => setOpenAuthModal(true)}
					className='flex items-center gap-2 w-full'
				>
					<Avatar className='border-2 border-transparent rounded-full cursor-pointer hover:border-theme'>
						{/* <AvatarImage
								className='m-auto rounded-full'
								src={avatarImageUrl}
							/> */}
						<AvatarFallback>
							<CircleUser
								size={40}
								className='cursor-pointer text-foreground hover:text-theme p-1 bg-transparent hover:bg-secondary rounded-full'
							/>
						</AvatarFallback>
					</Avatar>
					<span className='text-foreground'>Вход и регистрация</span>
				</div>
			</div>

			<div className='flex items-center justify-between w-full h-12 text-base font-medium bg-transparent hover:bg-secondary text-primary rounded-xl cursor-pointer px-3 mt-1'>
				<div className='flex items-center justify-between w-full'>
					<span className='text-foreground'>Оформление</span>
					<ModeToggle />
				</div>
			</div>

			<SideFooter className='mt-1' />
		</div>
	)
}
