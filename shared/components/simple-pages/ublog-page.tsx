'use client'

import { Container, NewPostButton, ProfileAvatar } from '@/shared/components'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/components/ui/accordion'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'


interface User {
	id: number;
	fullName: string;
	profile_picture: string | null;
	email: string;
	role: string;
	bio: string | null;
}

interface Props {
	author: User | null;
	className?: string
}

const truncateText = (text: string, maxLength: number | undefined) => {
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
}

export const UBlogPage: React.FC<Props> = ({
	                                           author,
	                                           className
                                           }) => {
	const { formatMessage } = useIntl()
	
	if (!author) {
		return <div>Author not found</div>
	}
	
	const truncatedName = truncateText(author.fullName, 20)
	const truncatedDescription = truncateText(author.bio || '', 44)
	
	return (
			<Container className={cn('mt-4', className)}>
			<div className='h-full w-full flex'>
				<div className='w-2/5'>
					<Link href={'/u/' + author.id}>
						<div className=''>
							<ProfileAvatar
								className='w-36 h-36 border-none bg-secondary hover:bg-secondary'
								avatarImage={String(author.profile_picture)}
								avatarSize={Number(144)} />
							<div className='flex h-full my-auto'>
								<div>
									<p className='font-semibold text-4xl mt-2'>
										{truncatedName}
									</p>
									<p className='mt-1 text-gray-400 text-sm font-semibold'>
										{truncatedDescription}
									</p>
								</div>
							</div>
							<div className='flex gap-4 mt-4'>
								<NewPostButton authorAvatar={''} authorName={''} authorUrl={''} stormicName={''} hasSession={true} />
								<NewPostButton authorAvatar={''} authorName={''} authorUrl={''} stormicName={''} hasSession={true} />
							</div>
						</div>
					</Link>
				</div>
				
				<div className='w-3/5 border-l-2 border-l-blue-700 pl-4'>
					User Posts in blog
				</div>
			</div>
			
			</Container>
	)
}
