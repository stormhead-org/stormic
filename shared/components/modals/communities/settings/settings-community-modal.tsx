'use client'

import { Community } from '@/payload-types'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import React from 'react'
import { SettingsCommunityForm } from './forms/settings-community-form'

interface Props {
	data: Community
	open: boolean
	onClose: () => void
}

export const SettingsCommunityModal: React.FC<Props> = ({
	data,
	open,
	onClose
}) => {
	const handleClose = () => {
		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='bg-secondary transition-all duration-300-p-2'>
				<DialogHeader className='hidden'>
					<DialogTitle />
				</DialogHeader>
				<div className='flex mx-auto'>
					<div className=''>
						<div className='my-2'>
							<SettingsCommunityForm community={data} onClose={handleClose} />
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
