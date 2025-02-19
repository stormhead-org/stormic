'use client'

import { CommentFileModal } from '@/shared/components/modals/comment-file-modal'
import { DeleteCommentModal } from '@/shared/components/modals/delete-comment-modal'
import { useEffect, useState } from 'react'

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false)
	
	useEffect(() => {
		setIsMounted(true)
	}, [])
	
	if (!isMounted) {
		return null
	}
	
	return (
		<>
			<DeleteCommentModal />
			<CommentFileModal />
		</>
	)
}
