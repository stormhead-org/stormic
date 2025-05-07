'use client'

import { Container } from '@/shared/components'
import { CommentInput } from '@/shared/components/comments/comment-input-items/comment-input'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle
} from '@/shared/components/ui/drawer'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	apiUrl: string
	query: Record<string, any>
	open: boolean
	onClose: () => void
	className?: string
}

export const MobileNewCommentDrawer: React.FC<Props> = ({
	apiUrl,
	query,
	open,
	onClose,
	className
}) => {
	const handleClose = () => {
		onClose()
	}

	return (
		<Drawer open={open} onOpenChange={handleClose}>
			<DrawerContent className={cn(className, '')}>
				<DrawerHeader className='hidden'>
					<DrawerTitle />
				</DrawerHeader>
				<CommentInput apiUrl={apiUrl} query={query} isMobile={true} />
			</DrawerContent>
		</Drawer>
	)
}
