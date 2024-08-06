'use client'

import {
	Container,
	HeaderButtons,
	Notifications,
	ProfileButton,
} from '@/shared/components'
import { ModeToggle } from '@/shared/components/ui/mode-toggle'
import { cn } from '@/shared/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AuthModal } from './modals'

interface Props {
	hasSearch?: boolean
	hasCart?: boolean
	className?: string
}

export const Header: React.FC<Props> = ({
	hasSearch = true,
	hasCart = true,
	className,
}) => {
	const router = useRouter()
	const [openAuthModal, setOpenAuthModal] = React.useState(false)

	return (
		<header className={cn('border-b', className)}>
			<Container className='flex items-center justify-between py-4'>
				{/* Левая часть */}
				<Link href='/'>
					<div className='flex items-center gap-4 w-[250px]'>
						<Image src='/logo.png' alt='Logo' width={42} height={42} />
						<div>
							<h1 className='text-2xl uppercase font-black'>Stormic</h1>
							<p className='text-sm text-gray-400 leading-3'>
								код, GitHub и ты
							</p>
						</div>
					</div>
				</Link>

				{/* {hasSearch && (
					<div className='mx-10 flex-1'>
						<SearchInput />
					</div>
				)} */}
				<div className='w-[500px]'>
					<HeaderButtons />
				</div>

				{/* Правая часть */}
				<div className='flex items-center gap-3 w-[250px] justify-end'>
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
					/>

					<ModeToggle />

					<Notifications />

					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
				</div>
			</Container>
		</header>
	)
}
