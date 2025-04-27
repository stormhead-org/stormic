import { Media } from '@/payload-types'
import CommentImageGallery from '@/shared/components/comments/comment-image-gallery'
import { cn } from '@/shared/lib/utils'
import { truncateText } from '@/shared/utils/textUtils'
import { Link2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface CommentItemProps {
	content: string
	maxLength?: number
	postUrl?: string
	media: Media
	deleted: boolean
	className?: string
}

export const CommentBody: React.FC<CommentItemProps> = ({
	content,
	maxLength,
	postUrl,
	media,
	deleted,
	className
}) => {
	const truncatedContent = truncateText(content, maxLength)

	// const fileType = fileUrl?.split('.').pop()
	// const isPDF = fileType === 'pdf' && fileUrl
	// const isImage = !isPDF && fileUrl

	return (
		<>
			<div className={cn('mt-2', className)}>
				{content && (
					<a href={postUrl}>
						<p
							className={cn(
								deleted
									? 'italic text-zinc-500 dark:text-zinc-400'
									: 'text-black dark:text-white'
							)}
						>
							{truncatedContent}
						</p>
					</a>
				)}
				{media && (
					<div className='mt-2'>
						<div className='relative rounded-md overflow-hidden flex items-center justify-center bg-primary/10 mb-1 h-40 w-full'>
							{media?.url && (
								<div>
									<CommentImageGallery images={[media.url]} />
									<Link
										href={media.url}
										target='_blank'
										rel='noopener noreferrer'
										className='absolute bottom-2 right-2 rounded-md bg-secondary p-1 cursor-pointer text-black dark:text-white'
									>
										<Link2 />
									</Link>
								</div>
							)}
						</div>
					</div>
				)}
				{/* {isPDF && (
					<div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
						<FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
						<a
							href={fileUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
						>
							PDF файл
						</a>
					</div>
				)} */}
			</div>
		</>
	)
}
