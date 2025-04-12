'use client'

import { Community, Post, type User } from '@/payload-types'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Skeleton } from '../../ui/skeleton'
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow
} from '@/shared/components/ui/table'
import { PostDeletedItem } from './post-deleted-item'

interface Props {
	post: Post[]
	communities: Community[]
	currentUser: User
	loading?: boolean
	className?: string
}

export const PostDeletedForm: React.FC<Props> = ({
	post,
	communities,
	currentUser,
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
			<div className='mt-4'>
				<div className='flex justify-center items-center gap-4'>
					<div className='border-b-2 border-b-blue-600 cursor-pointer'>
						<p>Посты</p>
					</div>
				</div>
				<Table className='mt-4'>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[200px]'>Название</TableHead>
							<TableHead>Содержание</TableHead>
							<TableHead>Сообщество</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{post.map(item => (
							<PostDeletedItem
								key={item.id}
								post={item}
								communities={communities}
								currentUser={currentUser}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
