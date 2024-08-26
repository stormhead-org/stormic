'use client'

import { AuthModal } from '@/shared/components/modals'
import React from 'react'
import { cn } from '../lib/utils'
import { Button } from './ui/button'

interface Props {
	authorAvatar: string
	authorName: string
	authorUrl: string
	hasSession: boolean
	className?: string
}

export const NewPostButton: React.FC<Props> = ({
	                                               authorAvatar,
	                                               authorName,
	                                               authorUrl,
	                                               hasSession,
	                                               className
                                               }) => {
	const [openWriteModal, setOpenWriteModal] = React.useState(false)
	const [openAuthModal, setOpenAuthModal] = React.useState(false)
	
	return (
		<div className={cn('', className)}>
			{/* <WriteModal */}
			{/* 	open={openWriteModal} */}
			{/* 	onClose={() => setOpenWriteModal(false)} */}
			{/* 	authorAvatar={authorAvatar} */}
			{/* 	authorName={authorName} */}
			{/* 	authorUrl={authorUrl} */}
			{/* /> */}
			<AuthModal
				open={openAuthModal}
				onClose={() => setOpenAuthModal(false)}
			/>
			
			<Button
				variant='secondary'
				className='h-12 w-full text-lg font-bold'
				type='button'
				onClick={hasSession ? () => setOpenWriteModal(true) : () => setOpenAuthModal(true)}
			>
				Новый пост
			</Button>
		</div>
	)
}
