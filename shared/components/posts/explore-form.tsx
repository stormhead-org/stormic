'use client'

import { Community, type HostSetting, Post, type User } from '@/payload-types'
import { CommunitiesItem } from '@/shared/components/communities/list-items/communities-item'
import { PostItem } from '@/shared/components/posts/post-items/post-item'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import Link from 'next/link'
import React, { useState } from 'react'

interface Props {
	hostSettings: HostSetting
	posts: Post[]
	communities: Community[]
	users: User[]
	postPermissions: Record<number, Permissions | null>
	currentUser?: User
	limit?: number
	loading?: boolean
	relatedPost?: boolean
	className?: string
}

// Встроенный компонент для поиска
const InlineSearchInput: React.FC<{
	onSearchChange: (query: string) => void
	className?: string
}> = ({ onSearchChange, className }) => {
	const [query, setQuery] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value
		setQuery(newQuery)
		onSearchChange(newQuery)
	}

	return (
		<input
			type='text'
			value={query}
			onChange={handleChange}
			placeholder='Поиск...'
			className={cn(
				'border rounded-md p-2 w-96 bg-secondary text-black dark:text-white outline-none',
				className
			)}
		/>
	)
}

export const ExploreForm: React.FC<Props> = ({
	hostSettings,
	posts,
	communities,
	users,
	postPermissions,
	currentUser,
	limit,
	loading,
	relatedPost,
	className
}) => {
	const [searchQuery, setSearchQuery] = useState('')

	if (loading) {
		return (
			<div className={className}>
				{[...Array(limit)].map((_, index) => (
					<Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
				))}
			</div>
		)
	}

	const bannerUrl =
		typeof hostSettings.banner === 'object'
			? getMediaUrl(hostSettings.banner, '/defaultBanner.jpg')
			: '/defaultBanner.jpg'

	const styling = {
		backgroundImage: `url('${bannerUrl}')`
	}

	// Фильтрация данных на основе поискового запроса
	const filteredUsers = users.filter(user =>
		user.name.toLowerCase().includes(searchQuery.toLowerCase())
	)
	const filteredCommunities = communities.filter(community =>
		community.title.toLowerCase().includes(searchQuery.toLowerCase())
	)
	const filteredPosts = posts.filter(post =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase())
	)

	// Определяем, что показывать: отфильтрованные данные или по умолчанию
	const displayUsers = searchQuery ? filteredUsers : users.slice(0, 3)
	const displayCommunities = searchQuery
		? filteredCommunities
		: communities.slice(0, 3)
	const displayPosts = searchQuery ? filteredPosts : posts

	return (
		<div className={cn('', className)}>
			<div>
				<div
					className='rounded-xl bg-cover bg-center bg-no-repeat w-full'
					style={styling}
				>
					<div className='py-10 text-center'>
						<span className='uppercase font-extrabold text-4xl [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)]'>
							{hostSettings.title || 'Stormic'}
						</span>
					</div>
				</div>
				<InlineSearchInput
					onSearchChange={setSearchQuery}
					className='w-96 -mt-6 mx-auto'
				/>
			</div>

			{/* Пользователи */}
			<div className='mt-4'>
				<h2 className='text-xl font-bold'>Пользователи</h2>
				{displayUsers.length > 0 ? (
					displayUsers.map(user => (
						<div key={user.id} className='py-1'>
							<Link
								href={`/u/${user.id}`}
								className='text-blue-500 hover:underline'
							>
								{user.name}
							</Link>
						</div>
					))
				) : (
					<p className='text-gray-500'>Пользователи не найдены</p>
				)}
				{!searchQuery && users.length > 5 && (
					<Link
						href='/users'
						className='text-blue-500 hover:underline mt-2 block'
					>
						Посмотреть больше
					</Link>
				)}
			</div>

			{/* Сообщества */}
			<div className='mt-4'>
				<h2 className='text-xl font-bold'>Сообщества</h2>
				{displayCommunities.length > 0 ? (
					displayCommunities.map(community => (
						<CommunitiesItem
							key={community.id}
							community={community}
							currentUser={currentUser}
							joinButton={true}
							className='mb-1 w-full'
						/>
					))
				) : (
					<p className='text-gray-500'>Сообщества не найдены</p>
				)}
				{!searchQuery && communities.length > 3 && (
					<Link
						href='/communities'
						className='text-blue-500 hover:underline mt-2 block'
					>
						Посмотреть больше
					</Link>
				)}
			</div>

			{/* Посты */}
			<div className='mt-4'>
				<h2 className='text-xl font-bold'>Посты</h2>
				{displayPosts.length > 0 ? (
					displayPosts.map(post => (
						<PostItem
							key={post.id}
							post={post}
							communities={communities}
							permissions={postPermissions[post.id]}
							relatedPost={relatedPost}
						/>
					))
				) : (
					<p className='text-gray-500'>Посты не найдены</p>
				)}
			</div>
		</div>
	)
}
