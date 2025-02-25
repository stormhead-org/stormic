'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import React from 'react'
import { CommunityNameForm } from './forms/name-form'
import { CommunityStyleForm } from './forms/style-form'

interface Props {
	open: boolean
	onClose: () => void
}

export const NewCommunityModal: React.FC<Props> = ({ open, onClose }) => {
	const [type, setType] = React.useState<
		'name' | 'style' | 'register' | 'passwordReset'
	>('name')

	const onSwitchType = () => {
		setType(type === 'name' ? 'register' : 'name')
	}

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
							{type === 'name' && (
								<CommunityNameForm onClose={handleClose} setType={setType} />
							)}
							{type === 'style' && (
								<CommunityStyleForm onClose={handleClose} setType={setType} />
							)}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
