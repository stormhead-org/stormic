import { ProfileAvatar } from '@/shared/components'
import { CategorySetInPostWriteToggle } from '@/shared/components/ui/category-set-in-post-write-toggle'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'

export interface PostWriteHeaderProps {
	authorName: string
	authorAvatar?: string
	authorUrl: string
	setCategory?: string
	className?: string
}

export const PostWriteHeader: React.FC<PostWriteHeaderProps> = ({
	                                                                authorName,
	                                                                authorAvatar,
	                                                                authorUrl,
	                                                                setCategory,
	                                                                className
                                                                }) => {
	
	return (
		<div className={cn('flex justify-between w-full', className)}>
			<div className='flex items-center'>
				<Link className='' href={authorUrl}>
					<ProfileAvatar className='bg-a-color -mt-2' avatarImage={String(authorAvatar)}
					               avatarSize={Number(34)} />
				</Link>
				<div className='ml-2'>
					
					<Link className='hover:text-primary/50' href={authorUrl}>{authorName}</Link>
					<br />
					{/* <p className='text-sm'>{setCategory}</p> */}
					<div className='-ml-4 -mt-3 font-medium'>
						<CategorySetInPostWriteToggle />
					</div>
				</div>
			</div>
		</div>
	)
}
