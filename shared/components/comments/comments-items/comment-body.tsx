import CommentImageGallery from '@/shared/components/comments/comment-image-gallery'
import { cn } from '@/shared/lib/utils'
import { FileIcon, Link2 } from 'lucide-react'
import React from 'react'

export interface CommentItemProps {
	content: string
	maxLength?: number
	postUrl?: string
	fileUrl: string | null
	deleted: boolean
	className?: string
}

const truncateText = (text: string, maxLength: number | undefined) => {
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
}

export const CommentBody: React.FC<CommentItemProps> = ({
	                                                        content,
	                                                        maxLength,
	                                                        postUrl,
	                                                        fileUrl,
	                                                        deleted,
	                                                        className
                                                        }) => {
	
	const truncatedContent = truncateText(content, maxLength)
	
	const fileType = fileUrl?.split('.').pop()
	const isPDF = fileType === 'pdf' && fileUrl
	const isImage = !isPDF && fileUrl
	
	return (
		<>
			<div className={cn('mt-2', className)}>
				{isImage && (
					<div
						className=''
					>
						<div
							className='relative rounded-md overflow-hidden flex items-center justify-center bg-primary/10 p-1 mb-1'>
							<CommentImageGallery images={fileUrl ? [fileUrl] : []} />
							<a
								href={fileUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='absolute bottom-2 right-2 rounded-md bg-secondary p-1 cursor-pointer'
							>
								<Link2 />
							</a>
						</div>
					
					</div>
				
				)}
				{isPDF && (
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
				)}
				{!fileUrl && (
					<a href={postUrl}>
						<p
							className={cn(deleted && 'italic text-zinc-500 dark:text-zinc-400'
							)}
						>
							{truncatedContent}
						</p>
					</a>
				
				)}
			</div>
		</>
	)
}
