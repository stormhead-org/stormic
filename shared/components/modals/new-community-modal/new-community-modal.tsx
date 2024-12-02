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
				className='bg-primary transition-all duration-300-p-2'
			>
				<div className='flex mx-auto'>
					<div className='p-2'>
						<div id='editorjs' className='max-w-[600px] my-2'/>
						<button
							className='my-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
						>
							Опубликовать
						</button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
