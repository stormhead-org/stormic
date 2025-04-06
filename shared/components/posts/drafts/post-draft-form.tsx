'use client'

import { Community, Post, type User } from '@/payload-types'
import { Title } from '@/shared/components'
import { PostDraftItem } from '@/shared/components/posts/drafts/post-draft-item'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Skeleton } from '../../ui/skeleton'
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui/table'

interface Props {
	post: Post[]
	communities: Community[]
	loading?: boolean
	className?: string
}

export const PostDraftForm: React.FC<Props> = ({
	                                               post,
	                                               communities,
	                                               loading,
	                                               className
                                               }) => {
	if (loading) {
		return (
			<div className={className}>
				{[...Array(5)].map((_, index) => (
					<Skeleton key={index} className='h-12 mb-4 rounded-[8px]' />
				))}
			</div>
		)
	}
	
	return (
		<div className={cn('overflow-x-auto', className)}>
			<Title text='Ваши черновики' />
			<Table className='mt-4'>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[200px]">Название</TableHead>
						<TableHead>Содержание</TableHead>
						<TableHead>Сообщество</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{post.map(item => (
							<PostDraftItem
								key={item.id}
								post={item}
								communities={communities}
								currentUser={item.author as User}
							/>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
