import { Community } from '@/payload-types'
import { ProfileAvatar, Title } from '@/shared/components'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/shared/components/ui/accordion'
import Link from 'next/link'
import React from 'react'

interface Props {
	community: Community
	onClose?: VoidFunction
}

const truncateText = (text: string, maxLength: number | undefined) => {
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
}

export const TeamCommunityForm: React.FC<Props> = ({ community, onClose }) => {
	const truncatedName = truncateText(community.owner?.name || '', 20)
	const truncatedDescription = truncateText(
		community.owner?.description || '',
		24
	)

	return (
		<div className='min-w-[50rem]'>
			<div className='w-full flex justify-center items-center'>
				<Title text='Cообщество' size='md' className='font-bold mr-2' />
			</div>
			<div className='flex mt-4'>
				<div className='w-2/5'>
					<Title
						text='Управляющая команда'
						size='sm'
						className='font-bold mr-2'
					/>
					<Title text='Владелец' size='sm' className='font-bold mr-2 mt-4' />
					<Link href={'/u/' + community.owner?.id}>
						<div className='flex gap-4 mt-1'>
							<ProfileAvatar
								className='w-11 h-11 border-none bg-secondary hover:bg-secondary'
								avatarImage={community.owner?.avatar?.url}
								// avatarImage={String(community.owner?.userAvatar?.url || '')}
								avatarSize={Number(44)}
							/>
							<div className='flex h-full my-auto'>
								<div>
									<p className='font-semibold text-md'>{truncatedName}</p>
									<p className='-mt-1 text-gray-400 text-sm font-semibold'>
										{truncatedDescription}
									</p>
								</div>
							</div>
						</div>
					</Link>
					<Title text='Связаться' size='sm' className='font-bold mr-2 mt-4' />
					<p className='text-md mt-1'>{community.contacts}</p>
					<Title text='Модераторы' size='sm' className='font-bold mr-2 mt-4' />
					{!community.moderators || community.moderators.length === 0 ? (
						<p className='text-md mt-1'>Модераторы не назначены</p>
					) : (
						<>
							{community.moderators?.map((item, index) => (
								<Link key={index} href={'/u/' + item.id}>
									<div className='flex gap-4 mt-1'>
										<ProfileAvatar
											className='w-11 h-11 border-none bg-secondary hover:bg-secondary'
											avatarImage={String(item.avatar?.url || '')}
											avatarSize={Number(44)}
										/>
										<div className='flex h-full my-auto'>
											<div>
												<p className='font-semibold text-md'>
													{truncateText(item.name || '', 20)}
												</p>
												<p className='-mt-1 text-gray-400 text-sm font-semibold'>
													{truncateText(item.description || '', 24)}
												</p>
											</div>
										</div>
									</div>
								</Link>
							))}
						</>
					)}
				</div>
				<div className='w-3/5 h-[70vh] overflow-auto no-scrollbar'>
					<Title text='Описание' size='sm' className='font-bold mr-2' />
					<p className='mt-1 text-justify'>{community.description}</p>
					<Title text='Правила' size='sm' className='font-bold mr-2 mt-4' />
					<Accordion
						className='rounded-md bg-secondary'
						type='single'
						collapsible
					>
						{community.rules?.map((item, index) => (
							<AccordionItem key={index} value={`key-${index}`}>
								<AccordionTrigger>
									{/* {formatMessage({ id: 'aboutPage.rules' })} */}
									{`${index + 1}. ${item.communityNameRule}`}
								</AccordionTrigger>
								<AccordionContent className='text-base'>
									{item.communityDescriptionRule}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	)
}
