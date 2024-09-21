import { useBookmarksStore } from '@/shared/stores/bookmarks-store'
import { Bookmark } from 'lucide-react'
import React, { useEffect } from 'react'

interface BookmarksButtonProps {
	postId: number;
}

export const BookmarkButton: React.FC<BookmarksButtonProps> = ({ postId }) => {
	const { bookmarksCount, hasAdded, toggleBookmark, initialize } = useBookmarksStore(state => ({
		bookmarksCount: state.bookmarksCount[postId] || 0, // Используем объект для хранения закладок по postId
		hasAdded: state.hasAdded[postId] || false,
		toggleBookmark: state.toggleBookmark,
		initialize: state.initialize
	}))
	
	useEffect(() => {
		initialize(postId)
	}, [postId, initialize])
	
	const handleLike = async () => {
		await toggleBookmark(postId)
	}
	
	return (
		<button onClick={handleLike} className='like-button focus:outline-none  mr-4'>
			<div className='flex group items-center cursor-pointer'>
				{hasAdded ? (
					<>
						<Bookmark className='bg-blue-800/20 text-blue-700 rounded-full mr-1 w-7 h-7 p-1' />
						<span className='text-blue-700 font-bold'>
									{bookmarksCount}
								</span>
					</>
				) : (
					<>
						<Bookmark
							className='group-hover:bg-blue-800/20 group-hover:text-blue-700 rounded-full mr-1 w-7 h-7 p-1' />
						<span className='group-hover:text-blue-700 font-bold'>
									{bookmarksCount}
						</span>
					</>
				)}
			</div>
		</button>
	)
}
