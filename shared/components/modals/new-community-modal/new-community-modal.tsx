'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import React from 'react'
import { NewCommunityForm } from './forms/new-community-form'

interface Props {
	userId: number
	open: boolean
	onClose: () => void
}

export const NewCommunityModal: React.FC<Props> = ({
	userId,
	open,
	onClose
}) => {
	const handleClose = () => {
		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='bg-secondary transition-all duration-300-p-2 rounded-xl'>
				<DialogHeader className='hidden'>
					<DialogTitle />
				</DialogHeader>
				<div className='flex mx-auto'>
					<div className='my-2'>
						<NewCommunityForm userId={userId} onClose={handleClose} />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
