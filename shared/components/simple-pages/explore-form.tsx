'use client'

import { Community, type HostSetting, Post, type User } from '@/payload-types'
import { PostItem } from '@/shared/components/posts/post-items/post-item'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Permissions } from '@/shared/lib/permissions'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { Component, Newspaper, Search, Users2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ExploreProfileItem } from '../profiles/community-profiles-items/explore-profile-item'
import { Button } from '../ui/button'

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
		<div className='flex rounded-xl flex-1 justify-between relative h-11 z-30 lg:mx-20'>
			<Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-foreground' />
			<input
				className='rounded-xl outline-none w-full pl-11 bg-secondary text-foreground'
				type='text'
				value={query}
				onChange={handleChange}
				placeholder='Поиск...'
			/>
		</div>
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
	const router = useRouter()

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
			? getMediaUrl(hostSettings.banner, 'medium', '/defaultBanner.jpg')
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
			<div className='mx-2 mt-2 lg:mt-0 lg:mx-0'>
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
				<div className='mt-2 lg:-mt-6 flex items-center justify-center'>
					<InlineSearchInput onSearchChange={setSearchQuery} />
				</div>
			</div>

			{/* Пользователи */}
			<div className='mt-2 mx-2 lg:mt-4 lg:mx-0'>
				<Button
					variant='blue'
					type='button'
					className='flex gap-2 justify-start w-full mb-2 h-12 text-lg font-bold bg-secondary text-foreground hover:text-background rounded-xl'
					onClick={() => router.push('/users')}
				>
					<Users2 size={22} />
					Пользователи
				</Button>
				{displayUsers.length > 0 ? (
					displayUsers.map(user => (
						<ExploreProfileItem
							key={user.id}
							data={user}
							currentUser={currentUser}
							hasUser={true}
							className='mb-1 w-full'
						/>
					))
				) : (
					<p className='text-gray-500'>Пользователи не найдены</p>
				)}
			</div>

			{/* Сообщества */}
			<div className='mt-2 mx-2 lg:mx-0'>
				<Button
					variant='blue'
					type='button'
					className='flex gap-2 justify-start w-full mb-2 h-12 text-lg font-bold bg-secondary text-foreground hover:text-background rounded-xl'
					onClick={() => router.push('/communities')}
				>
					<Component size={22} />
					Сообщества
				</Button>
				{displayCommunities.length > 0 ? (
					displayCommunities.map(community => (
						<ExploreProfileItem
							key={community.id}
							data={community}
							currentUser={currentUser}
							hasUser={false}
							className='mb-1 w-full'
						/>
					))
				) : (
					<p className='text-gray-500'>Сообщества не найдены</p>
				)}
			</div>

			{/* Посты */}
			<div className='mt-2 mx-2 lg:mx-0'>
				<Button
					variant='blue'
					type='button'
					className='flex gap-2 justify-start w-full mb-2 h-12 text-lg font-bold bg-secondary text-foreground hover:text-background rounded-xl'
					onClick={() => router.push('/')}
				>
					<Newspaper size={22} />
					Посты
				</Button>
				{displayPosts.length > 0 ? (
					displayPosts.map(post => (
						<PostItem
							key={post.id}
							post={post}
							communities={communities}
							permissions={postPermissions[post.id]}
							relatedPost={relatedPost}
							className='m-0 mb-2 lg:mt-2 lg:mx-0'
						/>
					))
				) : (
					<p className='text-gray-500'>Посты не найдены</p>
				)}
			</div>
		</div>
	)
}
