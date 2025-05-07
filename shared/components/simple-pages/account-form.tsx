'use client'

import { HostSetting, User } from '@/payload-types'
import { SideFooter } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { signOut } from '@/shared/utils/api/users/signOut'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { CircleUser, LogOut, Pencil, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { toast } from 'sonner'
import { AuthModal } from '../modals'
import { ModeToggle } from '../ui/ModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

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

	const handleSignOut = useCallback(async () => {
		let toastMessage = ''
		try {
			const result = await signOut()
			if (result.message) {
				toastMessage = 'Вы успешно вышли из аккаунта!'
				toast.error(toastMessage, {
					duration: 3000
				})
				router.refresh()
			}
		} catch (error) {
			console.error('Не удалось выйти:', error)
			toastMessage = 'Ошибка при выходе из аккаунта!'
			toast.error(toastMessage, {
				duration: 3000
			})
		}
	}, [router])

	return (
		<div className={cn('', className)}>
			{currentUser ? (
				<>
					<div className='flex items-center justify-between w-full h-12 text-base font-medium bg-transparent hover:bg-secondary text-foreground rounded-xl cursor-pointer px-4'>
						<div
							onClick={() => router.push(`/u/${currentUser.id}`)}
							className='flex items-center gap-2 w-full'
						>
							<Avatar className='border-2 border-transparent rounded-full cursor-pointer hover:border-theme'>
								<AvatarImage
									className='m-auto rounded-full'
									src={getMediaUrl(currentUser.avatar, '/logo.png')}
								/>
								<AvatarFallback>
									<CircleUser
										size={40}
										className='cursor-pointer text-foreground hover:text-theme p-1 bg-transparent hover:bg-secondary rounded-full'
									/>
								</AvatarFallback>
							</Avatar>
							<span className='text-foreground'>{currentUser.name}</span>
						</div>
					</div>

					<div className='flex items-center justify-between w-full h-12 text-base font-medium bg-transparent hover:bg-secondary text-foreground rounded-xl cursor-pointer px-4 mt-1'>
						<div
							onClick={() => router.push(`/u/${currentUser.id}/drafts`)}
							className='flex items-center gap-2 w-full'
						>
							<Pencil size={22} />
							<span className='text-foreground'>Черновики</span>
						</div>
					</div>

					<div className='flex items-center justify-between w-full h-12 text-base font-medium bg-transparent hover:bg-secondary text-foreground rounded-xl cursor-pointer px-4 mt-1'>
						<div
							onClick={() => router.push('/settings/user/profile')}
							className='flex items-center gap-2 w-full'
						>
							<Settings size={22} />
							<span className='text-foreground'>Настройки</span>
						</div>
					</div>
				</>
			) : (
				<>
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
						logoImage={getMediaUrl(hostSettings.logo, '/logo.png')}
						authImage={getMediaUrl(
							hostSettings.authBanner,
							'/defaultBanner.jpg'
						)}
						stormicName={hostSettings.title || 'Stormic'}
					/>

					<div className='flex items-center justify-between w-full h-12 text-base font-medium bg-transparent hover:bg-secondary text-foreground rounded-xl cursor-pointer px-4'>
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
				</>
			)}

			<div className='flex items-center justify-between w-full h-12 text-base font-medium bg-transparent hover:bg-secondary text-foreground rounded-xl cursor-pointer px-4 mt-1'>
				<div className='flex items-center justify-between w-full'>
					<span className='text-foreground'>Оформление</span>
					<ModeToggle />
				</div>
			</div>

			<SideFooter className='mt-1' />

			{currentUser && (
				<>
					<div className='flex items-center justify-between w-full h-12 text-base font-medium bg-transparent hover:bg-secondary text-foreground rounded-xl cursor-pointer px-4 mt-1'>
						<div
							onClick={handleSignOut}
							className='flex items-center gap-2 w-full'
						>
							<LogOut size={22} />
							<span className='text-foreground'>Выйти</span>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
