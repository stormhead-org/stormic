'use client'

import { Community, Post, User } from '@/payload-types'
import { PostEditModal } from '@/shared/components/modals/post-edit-modal/post-edit-modal'
import { cn } from '@/shared/lib/utils'
import { truncateText } from '@/shared/utils/textUtils'
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
			? firstBlock.data.text.slice(0, 22) +
					(firstBlock.data.text.length > 22 ? '...' : '')
			: 'Контент без текста'
	}

	return (
		<>
			<div className='flex items-center justify-between w-full h-12 text-base font-medium bg-transparent hover:bg-secondary text-foreground rounded-xl cursor-pointer px-4 mb-1'>
				<PostEditModal
					open={openEditModal}
					onClose={() => setOpenEditModal(false)}
					communities={communities}
					currentUser={currentUser}
					post={post}
				/>
				<div
					onClick={() => setOpenEditModal(true)}
					className='flex items-center w-full gap-4'
				>
					<span className='truncate max-w-[32ch] lg:w-[13ch] text-foreground'>
						{post.title.length > 0 ? post.title : 'Название отсутствует'}
					</span>
					<span className='hidden lg:block w-2/4 text-foreground'>
						{getContentExcerpt(post.content as unknown as OutputData)}
					</span>
					<span className='hidden lg:block w-1/4 text-foreground'>
						{truncateText(communityName, 10)}
					</span>
				</div>
			</div>
		</>
	)
}
