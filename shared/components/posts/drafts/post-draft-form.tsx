'use client'

import { Community, Post, type User } from '@/payload-types'
import { Title } from '@/shared/components'
import { PostDraftItem } from '@/shared/components/posts/drafts/post-draft-item'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/shared/components/ui/avatar'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { CircleUser } from 'lucide-react'
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

interface Props {
	post: Post[]
	communities: Community[]
	currentUser: User
	loading?: boolean
	className?: string
}

export const PostDraftForm: React.FC<Props> = ({
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
		<div className={cn('overflow-x-auto px-2', className)}>
			<Title text='Черновики' className='text-foreground -mt-1 lg:-mt-0 ml-4' />
			<div className='flex items-center justify-between w-full h-12 text-base font-medium bg-transparent text-foreground rounded-xl cursor-default px-4'>
				<div className='flex items-center w-full'>
					<span className='w-full lg:w-1/4 text-foreground'>Название</span>
					<span className='hidden lg:block w-2/4 text-foreground'>
						Содержание
					</span>
					<span className='hidden lg:block w-1/4 text-foreground'>
						Сообщество
					</span>
				</div>
			</div>
			{post.map(item => (
				<PostDraftItem
					key={item.id}
					post={item}
					communities={communities}
					currentUser={currentUser}
				/>
			))}
		</div>
	)
}
