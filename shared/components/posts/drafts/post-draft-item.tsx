'use client'

import { Community, Post, User } from '@/payload-types'
import { PostEditModal } from '@/shared/components/modals/post-edit-modal/post-edit-modal'
import { cn } from '@/shared/lib/utils'
import { OutputData } from '@editorjs/editorjs'
import React, { useState } from 'react'
import { TableCell, TableRow } from '@/shared/components/ui/table'

export const PostDraftItem: React.FC<{
	post: Post
	communities: Community[]
	currentUser: User
	className?: string
}> = ({ post, communities, currentUser, className }) => {
	const [openEditModal, setOpenEditModal] = useState(false)

	// Получаем название сообщества
	const community = communities.find(
		c =>
			c.id ===
			(typeof post.community === 'object' && post.community?.id
				? post.community.id
				: post.community)
	)
	const communityName = community ? community.title : 'Без сообщества'

	// Получаем отрывок контента
	const getContentExcerpt = (content: OutputData | null) => {
		if (!content || !content.blocks || content.blocks.length === 0)
			return 'Нет контента'
		const firstBlock = content.blocks[0]
		return firstBlock.type === 'paragraph' && firstBlock.data.text
			? firstBlock.data.text.slice(0, 30) +
					(firstBlock.data.text.length > 50 ? '...' : '')
			: 'Контент без текста'
	}

	// Обрезаем название поста до 20 символов
	const getTitleExcerpt = (title: string | undefined) => {
		if (!title) return 'Без названия'
		return title.length > 20 ? title.slice(0, 20) + '...' : title
	}

	return (
		<>
			<TableRow
				className={cn('hover:bg-primary/5 cursor-pointer', className)}
				onClick={() => setOpenEditModal(true)}
			>
				<TableCell>{getTitleExcerpt(post.title)}</TableCell>
				<TableCell>
					{getContentExcerpt(post.content as unknown as OutputData)}
				</TableCell>
				<TableCell>{communityName}</TableCell>
			</TableRow>
			<PostEditModal
				open={openEditModal}
				onClose={() => setOpenEditModal(false)}
				communities={communities}
				currentUser={currentUser}
				post={post}
			/>
		</>
	)
}
