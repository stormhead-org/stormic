'use client'

import { Container } from '@/shared/components'
import { CommentInput } from '@/shared/components/comments/comment-input-items/comment-input'
import { CommentInputAnswer } from '@/shared/components/comments/comment-input-items/comment-input-answer'
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
	parentCommentAuthorName: string
	setIsReplying: (isReplying: boolean) => void
	open: boolean
	onClose: () => void
	className?: string
}

export const MobileCommentAnswerDrawer: React.FC<Props> = ({
	apiUrl,
	query,
	parentCommentAuthorName,
	setIsReplying,
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
				<CommentInputAnswer
					apiUrl={apiUrl}
					query={query}
					setIsReplying={setIsReplying}
					parentCommentAuthorName={parentCommentAuthorName}
				/>
			</DrawerContent>
		</Drawer>
	)
}
