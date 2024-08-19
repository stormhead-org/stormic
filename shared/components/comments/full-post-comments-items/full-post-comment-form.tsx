'use client'

import { CommentItem } from '@/shared/components/comments/comments-items/comment-item'
import React from 'react'
import { Skeleton } from '../../ui/skeleton'

interface Comment {
	comment_id: number;
	content: string;
	likesCount: number;
	author: {
		fullName: string;
		profile_picture: string;
	};
	publication_date: string;
	author_id: number;
	post_id: number;
	post_title?: string;
	update_date?: string;
	parent_comment_id?: number | null;
	children?: Comment[]; // Дочерние комментарии могут быть необязательными
}

interface Props {
	items: Comment[] // Изменяем тип для поддержки вложенных комментариев
	loading?: boolean
	className?: string
}

const CommentComponent: React.FC<{ comment: Comment; level?: number }> = ({ comment, level = 0 }) => {
	const indentation = `ml-${level * 2}` // Отступ на основе уровня вложенности
	
	return (
		<div className={`${indentation} mt-4`}>
			<CommentItem
				content={comment.content}
				authorName={comment.author.fullName}
				authorUrl={`/u/${comment.author_id}`} // Примерный URL для автора
				authorAvatar={comment.author.profile_picture}
				likesCount={comment.likesCount}
				publicationDate={comment.publication_date}
				className='p-0 pl-4 cursor-default border-l-4 border-blue-600'
			/>
			{/* Отображаем дочерние комментарии, если они существуют */}
			{comment.children && comment.children.length > 0 && (
				<>
					{comment.children.map((childComment) => (
						<CommentComponent key={childComment.comment_id} comment={childComment} level={level + 1} />
					))}
				</>
			)}
		</div>
	)
}

export const FullPostCommentForm: React.FC<Props> = ({ items, loading, className }) => {
	
	if (loading) {
		return (
			<Skeleton className='h-6 mb-4 rounded-[8px]' />
		)
	}
	return (
		<>
			{items.map((item) => (
				<CommentComponent key={item.comment_id} comment={item} />
			))}
		</>
	)
}
