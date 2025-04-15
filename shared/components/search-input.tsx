'use client'

import { Post, User } from '@/payload-types'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl, getRelationProp } from '@/shared/utils/payload/getTypes'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
// import { useIntl } from 'react-intl'
import { useClickAway } from 'react-use'

interface Props {
	posts: Post[]
	className?: string
}

const truncateText = (text: string, maxLength: number | undefined) => {
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
}

export const SearchInput: React.FC<Props> = ({ posts, className }) => {
	// const { formatMessage } = useIntl()
	const [searchQuery, setSearchQuery] = React.useState('')
	const [focused, setFocused] = React.useState(false)
	// const [posts, setPosts] = React.useState<Post[]>([])
	const ref = React.useRef(null)

	useClickAway(ref, () => {
		setFocused(false)
	})

	const onClickItem = () => {
		setFocused(false)
		setSearchQuery('')
		// setPosts([])
	}

	const items = posts.map((item: Post) => ({
		postId: item.id,
		postTitle: item.title,
		postUrl: '/p/' + item.id,
		authorName: getRelationProp<User, 'name'>(item.author, 'name', '#'),
		authorAvatar:
			typeof item.author === 'object'
				? getMediaUrl(item.author?.avatar, '/logo.png')
				: '/logo.png'
	}))

	const filteredItems = items.filter(item =>
		item.postTitle.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<>
			{focused && (
				<div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />
			)}

			<div
				ref={ref}
				className={cn(
					'flex rounded-2xl flex-1 justify-between relative h-11 z-30 mx-auto',
					className
				)}
			>
				<Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
				<input
					className='rounded-2xl outline-none w-full pl-11 bg-secondary'
					type='text'
					// placeholder={formatMessage({ id: 'mainBannerForm.searchInputPlaceholder' })}
					placeholder='Поиск...'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>

				{posts.length > 0 && (
					<div
						className={cn(
							'absolute w-full bg-secondary rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
							focused && 'visible opacity-100 top-12'
						)}
					>
						{filteredItems.length === 0 && (
							<p className='pl-5'>Посты не найдены</p>
						)}
						{filteredItems.map(item => (
							<Link
								onClick={onClickItem}
								key={item.postId}
								className='flex items-center gap-3 mx-2 px-3 py-2 hover:bg-blue-700 text-black hover:text-white dark:text-white rounded-md'
								href={item.postUrl}
							>
								<img
									className='rounded-full h-8 w-8'
									src={item?.authorAvatar || '/logo.png'}
									alt={String(item.authorName)}
								/>
								<span>{String(truncateText(item.postTitle, 34))}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	)
}
