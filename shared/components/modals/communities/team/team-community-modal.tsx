'use client'

import { Community } from '@/payload-types'
import { Title } from '@/shared/components'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle
} from '@/shared/components/ui/drawer'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import React from 'react'
import { TeamCommunityForm } from './forms/team-community-form'

interface Props {
	data: Community
	open: boolean
	onClose: () => void
}

export const TeamCommunityModal: React.FC<Props> = ({
	data,
	open,
	onClose
}) => {
	const handleClose = () => {
		onClose()
	}

	const isMobile = useIsMobile()

	if (!isMobile) {
		return (
			<Dialog open={open} onOpenChange={onClose}>
				<DialogContent className='h-full lg:h-auto lg:min-w-[54rem] bg-secondary transition-all duration-300-p-2 lg:rounded-xl'>
					<DialogHeader>
						<DialogTitle className='text-2xl text-center font-bold my-0'>
							Сообщество
						</DialogTitle>
					</DialogHeader>
					<TeamCommunityForm community={data} onClose={handleClose} />
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={onClose}>
			<DrawerContent className='h-full bg-secondary px-4 transition-all duration-300 rounded-none'>
				<DrawerHeader>
					<DrawerTitle className='text-2xl text-center font-bold my-0'>
						Сообщество
					</DrawerTitle>
				</DrawerHeader>
				<div className='mt-2 overflow-auto flex-1'>
					<TeamCommunityForm community={data} onClose={handleClose} />
				</div>
			</DrawerContent>
		</Drawer>
	)
}
