import { Community, type User } from '@/payload-types'
import { ProfileAvatar, Title } from '@/shared/components'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/shared/components/ui/accordion'
import { getMediaUrl, getRelationProp } from '@/shared/utils/payload/getTypes'
import { truncateText } from '@/shared/utils/textUtils'
import Link from 'next/link'
import React from 'react'

interface Props {
	community: Community
	onClose?: VoidFunction
	className?: string
}

export const TeamCommunityForm: React.FC<Props> = ({
	community,
	onClose,
	className
}) => {
	const truncatedName = truncateText(
		getRelationProp<User, 'name'>(community.owner, 'name', '') || '',
		20
	)
	const truncatedDescription = truncateText(
		getRelationProp<User, 'description'>(community.owner, 'description', '') ||
			'',
		24
	)

	const ownerId = getRelationProp<User, 'id'>(community.owner, 'id', 0)
	const avatarImageUrl =
		typeof community.owner === 'object'
			? getMediaUrl(community.owner.avatar, 'medium', '/logo.png')
			: '/logo.png'

	return (
		<div className='h-auto lg:flex lg:gap-5'>
			<div className='w-full lg:w-2/5'>
				<Title
					text='Управляющая команда'
					size='sm'
					className='font-bold mr-2 text-foreground -mt-1 lg:mt-0'
				/>
				<Title
					text='Владелец'
					size='sm'
					className='font-bold mr-2 mt-4 text-foreground'
				/>
				<Link href={'/u/' + ownerId}>
					<div className='flex gap-2 mt-2 items-center'>
						<ProfileAvatar
							className='w-11 h-11'
							avatarImage={avatarImageUrl}
							avatarSize={Number(44)}
						/>
						<div className='flex h-full items-center'>
							<div className='-mt-1'>
								<p className='font-bold text-foreground'>{truncatedName}</p>
								<p className='-mt-1 text-foreground'>{truncatedDescription}</p>
							</div>
						</div>
					</div>
				</Link>
				<Title
					text='Связаться'
					size='sm'
					className='font-bold mr-2 mt-4 text-foreground'
				/>
				<p className='text-md mt-1'>
					{community.contacts ? community.contacts : 'Контакты не указаны'}
				</p>
				<Title
					text='Модераторы'
					size='sm'
					className='font-bold mr-2 mt-4 text-foreground'
				/>
				{!community.moderators || community.moderators.length === 0 ? (
					<p className='text-md mt-1'>Модераторы не назначены</p>
				) : (
					<>
						{community.moderators?.map((item, index) => {
							if (typeof item !== 'object') {
								return null
							}

							return (
								<Link
									key={index}
									href={`/u/${getRelationProp<User, 'id'>(item, 'id', 0)}`}
								>
									<div className='flex gap-4 mt-1'>
										<ProfileAvatar
											className='w-11 h-11'
											avatarImage={getMediaUrl(item.avatar, 'medium')}
											avatarSize={44}
										/>
										<div className='flex h-full my-auto'>
											<div>
												<p className='font-semibold text-md'>
													{truncateText(
														getRelationProp<User, 'name'>(item, 'name', ''),
														20
													)}
												</p>
												<p className='-mt-1 text-foreground font-semibold'>
													{truncateText(
														getRelationProp<User, 'description'>(
															item,
															'description',
															''
														) || '',
														24
													)}
												</p>
											</div>
										</div>
									</div>
								</Link>
							)
						})}
					</>
				)}
			</div>
			<div className='w-full lg:w-3/5 lg:h-[70vh] lg:overflow-auto lg:no-scrollbar'>
				<Title
					text='Описание'
					size='sm'
					className='font-bold mr-2 text-foreground lg:mt-0'
				/>
				<p className='mt-1 text-justify'>{community.description}</p>
				<Title
					text='Правила'
					size='sm'
					className='font-bold mr-2 mt-4 text-foreground'
				/>
				<Accordion
					className='rounded-xl bg-secondary text-foreground'
					type='single'
					collapsible
				>
					{community.rules?.map((item, index) => (
						<AccordionItem key={index} value={`key-${index}`}>
							<AccordionTrigger className='text-base'>
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
	)
}
