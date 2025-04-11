'use client'

import { Community, Post, User } from '@/payload-types'
import { ProfileAvatar } from '@/shared/components'
import UserFollowButton from '@/shared/components/user-follow-button'
import { formatDateTime } from '@/shared/lib/formatDateTime'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import {
	deletePost,
	removePostFromPublication
} from '@/shared/utils/api/posts/post-utils'
import { GripHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { PostEditModal } from '../../modals/post-edit-modal'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../../ui/dropdown-menu'

export interface PostHeaderProps {
	post: Post
	communities: Community[]
	currentUser?: User | null
	permissions: Permissions | null
	className?: string
}

export const PostHeader: React.FC<PostHeaderProps> = ({
	post,
	communities,
	currentUser,
	permissions,
	className
}) => {
	const [openEditModal, setOpenEditModal] = React.useState(false)
	const router = useRouter()

	const handleRemoveFromPublication = async () => {
		await removePostFromPublication(post, router)
	}

	const handleDeletePost = async () => {
		await deletePost(post, router)
	}

	return (
		<div className={cn('flex justify-between w-full', className)}>
			<div className='flex items-center'>
				<Link className='' href={`/u/${post.author?.id}` || '#'}>
					<ProfileAvatar avatarImage={String(post.author?.avatar?.url)} />
				</Link>
				<div className='ml-2'>
					<Link
						className='hover:text-a-color-hover'
						href={`/u/${post.author?.id}` || '#'}
					>
						{post.author?.name || '#'}
					</Link>
					<br />
					<Link
						className='text-sm hover:text-a-color-hover'
						href={post.community ? `/c/${post.community.id}` : '#'}
					>
						{post.community?.title || '#'}
					</Link>
					<span className='ml-2 text-sm cursor-default'>
						{formatDateTime(post.publishedAt ? post.publishedAt : '#')}
					</span>
				</div>
			</div>
			<div className='flex items-center'>
				<UserFollowButton userId={post.author?.id} />
				<PostEditModal
					open={openEditModal}
					onClose={() => setOpenEditModal(false)}
					post={post}
					authorId={post.author?.id}
					authorAvatar={post.author?.avatar?.url}
					authorName={post.author?.name || '#'}
					authorUrl={`/u/${post.author?.id}` || '#'}
					communities={communities}
				/>
				<DropdownMenu key={openEditModal ? 'open' : 'closed'}>
					<DropdownMenuTrigger asChild>
						<div className='group'>
							<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
								<GripHorizontal className='group-hover:bg-blue-800/20 rounded-full cursor-pointer ml-2 w-7 h-7 p-1' />
							</p>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='bg-secondary'>
						{(permissions?.HOST_OWNER ||
							permissions?.COMMUNITY_OWNER ||
							(currentUser != null && currentUser.id === post.author?.id)) && (
							<DropdownMenuItem
								className='cursor-pointer'
								onClick={() => setOpenEditModal(true)}
							>
								Редактировать
							</DropdownMenuItem>
						)}
						{(permissions?.HOST_OWNER ||
							permissions?.COMMUNITY_OWNER ||
							permissions?.COMMUNITY_POST_REMOVE_FROM_PUBLICATION) && (
							<DropdownMenuItem
								className='cursor-pointer'
								onClick={handleRemoveFromPublication}
							>
								Снять с публикации
							</DropdownMenuItem>
						)}
						{(permissions?.HOST_OWNER ||
							permissions?.COMMUNITY_OWNER ||
							permissions?.COMMUNITY_POST_DELETE) && (
							<DropdownMenuItem
								className='cursor-pointer'
								onClick={handleDeletePost}
							>
								Удалить
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
