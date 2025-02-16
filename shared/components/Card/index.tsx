'use client'
import useClickableCard from '@/shared/lib/useClickableCard'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/shared/components/Media'

export type CardPostData = Pick<Post, 'id' | 'community' | 'meta' | 'title'>

export const Card: React.FC<{
	alignItems?: 'center'
	className?: string
	doc?: CardPostData
	relationTo?: 'posts'
	showCommunities?: boolean
	title?: string
}> = props => {
	const { card, link } = useClickableCard({})
	const {
		className,
		doc,
		relationTo,
		showCommunities,
		title: titleFromProps
	} = props

	const { id, community, meta, title } = doc || {}
	const { description, image: metaImage } = meta || {}

	const hasCommunities =
		community && Array.isArray(community) && community.length > 0
	const titleToUse = titleFromProps || title
	const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
	const href = `/${relationTo}/${id}`

	return (
		<article
			className={cn(
				'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
				className
			)}
			ref={card.ref}
		>
			<div className='relative w-full '>
				{!metaImage && <div className=''>No image</div>}
				{metaImage && typeof metaImage !== 'string' && (
					<Media resource={metaImage} size='33vw' />
				)}
			</div>
			<div className='p-4'>
				{showCommunities && hasCommunities && (
					<div className='uppercase text-sm mb-4'>
						{showCommunities && hasCommunities && (
							<div>
								{community?.map((community, index) => {
									if (typeof community === 'object') {
										const { title: titleFromCommunity } = community

										const communityTitle =
											titleFromCommunity || 'Untitled community'

										const isLast = index === community.length - 1

										return (
											<Fragment key={index}>
												{communityTitle}
												{!isLast && <Fragment>, &nbsp;</Fragment>}
											</Fragment>
										)
									}

									return null
								})}
							</div>
						)}
					</div>
				)}
				{titleToUse && (
					<div className='prose'>
						<h3>
							<Link className='not-prose' href={href} ref={link.ref}>
								{titleToUse}
							</Link>
						</h3>
					</div>
				)}
				{description && (
					<div className='mt-2'>
						{description && <p>{sanitizedDescription}</p>}
					</div>
				)}
			</div>
		</article>
	)
}
