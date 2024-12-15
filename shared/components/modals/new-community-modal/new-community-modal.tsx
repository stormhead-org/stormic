'use client'

import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import React from 'react'

interface Props {
	open: boolean
	onClose: () => void
}

export const NewCommunityModal: React.FC<Props> = ({ open, onClose }) => {
	
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				className='bg-secondary transition-all duration-300-p-2'
			>
				<div className='flex mx-auto'>
					<div className='p-2'>
						<div className='max-w-[600px] my-2'/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
