'use client'

import { cn } from '@/shared/lib/utils'
import { Post } from '@prisma/client'
import { Search } from 'lucide-react'
import React from 'react'
import { useClickAway } from 'react-use'

interface Props {
	className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = React.useState('')
	const [focused, setFocused] = React.useState(false)
	const [post, setPost] = React.useState<Post[]>([])
	const ref = React.useRef(null)

	useClickAway(ref, () => {
		setFocused(false)
	})

	// useDebounce(
	// 	async () => {
	// 		try {
	// 			const response = await Api.post.search(searchQuery)
	// 			setPost(response)
	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	},
	// 	250,
	// 	[searchQuery]
	// )

	// const onClickItem = () => {
	// 	setFocused(false)
	// 	setSearchQuery('')
	// 	setpost([])
	// }

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
					placeholder='Поиск...'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>

				{/* {post.length > 0 && (
					<div
						className={cn(
							'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
							focused && 'visible opacity-100 top-12'
						)}
					>
						{post.map(post => (
							<Link
								onClick={onClickItem}
								key={post.id}
								className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'
								href={`/post/${post.id}`}
							>
								<img
									className='rounded-sm h-8 w-8'
									src={post.imageUrl}
									alt={post.name}
								/>
								<span>{post.name}</span>
							</Link>
						))}
					</div>
				)} */}
			</div>
		</>
	)
}
