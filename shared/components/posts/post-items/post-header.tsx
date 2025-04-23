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
import { getMediaUrl, getRelationProp } from '@/shared/utils/payload/getTypes'
import { Crown, GripHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ActionTooltip } from '../../action-tooltip'
import { PostEditModal } from '../../modals/post-edit-modal'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../../ui/dropdown-menu'

export interface Props {
	post: Post
	communities: Community[]
	permissions: Permissions | null
	roleIconMap?: ('hostOwner' | 'communityOwner')[]
	currentUser?: User | null
	className?: string
}

const roleIconMapConfig = {
	hostOwner: {
		icon: <Crown className='h-4 w-4 text-rose-500 ml-2' />,
		label: 'Владелец платформы'
	},
	communityOwner: {
		icon: <Crown className='h-4 w-4 text-indigo-500 ml-2' />,
		label: 'Владелец сообщества'
	}
}

export const PostHeader: React.FC<Props> = ({
	post,
	communities,
	permissions,
	roleIconMap,
	currentUser,
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

	const authorId = getRelationProp<User, 'id'>(post.author, 'id', 0)
	const communityId = getRelationProp<Community, 'id'>(post.community, 'id', 0)
	const avatarImageUrl =
		typeof post.author === 'object'
			? getMediaUrl(post.author?.avatar, '/logo.png')
			: '/logo.png'
	const authorName = getRelationProp<User, 'name'>(post.author, 'name', '')
	const communityTitle = getRelationProp<Community, 'title'>(
		post.community,
		'title',
		''
	)

	return (
		<div className={cn('flex justify-between w-full', className)}>
			<div className='flex items-center'>
				<Link className='' href={`/u/${authorId}` || '#'}>
					<ProfileAvatar avatarImage={avatarImageUrl} />
				</Link>
				<div className='ml-2'>
					<div className='flex items-center'>
						<Link
							className='text-black dark:text-white font-bold'
							href={`/u/${authorId}` || '#'}
						>
							{authorName}
						</Link>
						{roleIconMap &&
							roleIconMap.length > 0 &&
							roleIconMap.map(role => (
								<ActionTooltip key={role} label={roleIconMapConfig[role].label}>
									{roleIconMapConfig[role].icon}
								</ActionTooltip>
							))}
					</div>
					<Link
						className='text-sm text-black dark:text-white'
						href={post.community ? `/c/${communityId}` : '#'}
					>
						{communityTitle}
					</Link>
					<span className='ml-2 text-sm cursor-default'>
						{formatDateTime(post.publishedAt ? post.publishedAt : '#')}
					</span>
				</div>
			</div>
			<div className='flex items-center'>
				{currentUser && currentUser.id !== authorId && (
					<UserFollowButton userId={authorId} />
				)}
				{currentUser && (
					<PostEditModal
						open={openEditModal}
						onClose={() => setOpenEditModal(false)}
						communities={communities}
						currentUser={currentUser}
						post={post}
					/>
				)}
				{currentUser && (
					<DropdownMenu key={openEditModal ? 'open' : 'closed'}>
						<DropdownMenuTrigger asChild>
							<div className='group'>
								<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
									<GripHorizontal className='group-hover:bg-blue-800/20 rounded-full cursor-pointer ml-2 w-7 h-7 p-1' />
								</p>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='bg-secondary'>
							{permissions?.HOST_OWNER ||
							permissions?.COMMUNITY_OWNER ||
							(currentUser != null && currentUser.id === authorId) ||
							permissions?.COMMUNITY_POST_REMOVE_FROM_PUBLICATION ||
							permissions?.COMMUNITY_POST_DELETE ? (
								<>
									{(permissions?.HOST_OWNER ||
										permissions?.COMMUNITY_OWNER ||
										(currentUser != null && currentUser.id === authorId)) && (
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
								</>
							) : (
								<DropdownMenuItem className='cursor-default'>
									Нет доступных действий
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	)
}
