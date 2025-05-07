'use client'

import { HostSetting, User } from '@/payload-types'
import { ProfileAvatar } from '@/shared/components'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/shared/components/ui/accordion'
import { cn } from '@/shared/lib/utils'
import { getMediaUrl, getRelationProp } from '@/shared/utils/payload/getTypes'
import { truncateText } from '@/shared/utils/textUtils'
import {
	Delete,
	Gavel,
	LinkIcon,
	Radio,
	Settings,
	ShieldCheck,
	UserRoundCog
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { OwnerNotFound } from '../info-blocks/owner-not-found'

// import { useIntl } from 'react-intl'

interface Props {
	hostInfo: HostSetting
	hasOwner?: boolean
	className?: string
}

export const AboutForm: React.FC<Props> = ({
	hostInfo,
	hasOwner,
	className
}) => {
	const router = useRouter()
	// const { formatMessage } = useIntl()

	if (!hostInfo.owner) {
		return <OwnerNotFound />
	}

	const truncatedName = truncateText((hostInfo.owner as User).name || '', 20)
	const truncatedDescription = truncateText(
		(hostInfo.owner as User).description || '',
		24
	)

	const ownerId = getRelationProp<User, 'id'>(hostInfo.owner, 'id', 0)
	const avatarImage =
		typeof hostInfo.owner === 'object'
			? getMediaUrl(hostInfo.owner.avatar, 'square', '/logo.png')
			: '/logo.png'

	return (
		<div className={cn('', className)}>
			<div className='w-full mt-2'>
				<span className='flex text-2xl font-extrabold justify-center'>
					{process.env.NEXT_PUBLIC_BASE_URL}
				</span>

				<p className='text-xl font-medium mt-2 text-center'>
					{/* {formatMessage({ id: 'aboutPage.socialPlatform' })} */}
					социальная платформа на базе
					<Link
						href='https://stormic.app/about/'
						className='text-theme hover:text-theme-hover ml-1 font-bold'
					>
						Stormic
					</Link>
				</p>
			</div>

			{hasOwner && (
				<div className='flex w-full items-center justify-evenly bg-secondary p-1 mt-2 rounded-xl'>
					<div className='flex gap-2'>
						<div className='flex items-center hover:text-theme font-bold cursor-pointer mt-auto'>
							<Settings
								className='hover:bg-theme-hover/20 rounded-xl ml-2 w-7 h-7 p-1'
								onClick={() => router.push('/settings/host/main/platform')}
							/>
						</div>
						<div className='flex items-center hover:text-theme font-bold cursor-pointer mt-auto'>
							<LinkIcon
								className='hover:bg-theme-hover/20 rounded-xl ml-2 w-7 h-7 p-1'
								onClick={() => router.push('/settings/host/main/navigation')}
							/>
						</div>
						<div className='flex items-center hover:text-theme font-bold cursor-pointer mt-auto'>
							<Radio
								className='hover:bg-theme-hover/20 rounded-xl ml-2 w-7 h-7 p-1'
								onClick={() => router.push('/settings/host/main/social')}
							/>
						</div>
					</div>

					<div className='flex gap-2'>
						<div className='flex items-center hover:text-theme font-bold cursor-pointer mt-auto'>
							<ShieldCheck
								className='hover:bg-theme-hover/20 rounded-xl ml-2 w-7 h-7 p-1'
								onClick={() => router.push('/settings/host/permissions/roles')}
							/>
						</div>
						<div className='flex items-center hover:text-theme font-bold cursor-pointer mt-auto'>
							<Delete
								className='hover:bg-theme-hover/20 rounded-xl ml-2 w-7 h-7 p-1'
								onClick={() =>
									router.push('/settings/host/permissions/deleted')
								}
							/>
						</div>
						<div className='flex items-center hover:text-theme font-bold cursor-pointer mt-auto'>
							<Gavel
								className='hover:bg-theme-hover/20 rounded-xl ml-2 w-7 h-7 p-1'
								onClick={() => router.push('/settings/host/permissions/bans')}
							/>
						</div>
					</div>

					<div className='flex gap-2'>
						<div className='flex items-center hover:text-theme font-bold cursor-pointer mt-auto'>
							<UserRoundCog
								className='hover:bg-theme-hover/20 rounded-xl ml-2 w-7 h-7 p-1'
								onClick={() => router.push('/settings/host/administration')}
							/>
						</div>
					</div>
				</div>
			)}

			<div className='h-full w-full lg:flex bg-secondary rounded-xl p-4 mt-2'>
				<div className='w-full lg:w-1/2'>
					<p className='uppercase font-bold'>
						{/* {formatMessage({ id: 'aboutPage.managed' })} */}
						Управляется
					</p>
					<Link href={'/u/' + ownerId}>
						<div className='flex gap-2 mt-2 items-center'>
							<ProfileAvatar
								className='w-14 h-14 border-none bg-secondary hover:bg-secondary'
								avatarImage={avatarImage}
								avatarSize={Number(54)}
							/>
							<div className='flex h-full items-center'>
								<div className='-mt-2'>
									<p className='font-bold text-foreground'>{truncatedName}</p>
									<p className='-mt-1 font-medium text-foreground'>
										{truncatedDescription}
									</p>
								</div>
							</div>
						</div>
					</Link>
				</div>
				<div className='w-full lg:w-1/2  mt-2 lg:mt-0 lg:ml-1 pt-2 lg:pt-0 border-t-2 lg:border-t-0 lg:border-l-2 border-theme lg:pl-4'>
					<p className='uppercase text-foreground font-bold'>
						{/* {formatMessage({ id: 'aboutPage.contacts' })} */}
						Контакты
					</p>
					<div className='h-full'>
						<p className='text-foreground font-medium mt-2 lg:mt-3'>
							{hostInfo.contacts}
						</p>
					</div>
				</div>
			</div>

			<Accordion
				className='-mt-4 px-4 rounded-xl bg-secondary'
				type='single'
				defaultValue='about'
				collapsible
			>
				<AccordionItem value='about'>
					<AccordionTrigger className='text-lg font-medium -mb-4'>
						{/* {formatMessage({ id: 'aboutPage.about' })} */}О проекте
					</AccordionTrigger>
					<AccordionContent className='text-base'>
						{hostInfo.description}
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<Accordion
				className='mt-2 px-4 rounded-xl bg-secondary'
				type='single'
				defaultValue='about'
				collapsible
			>
				<p className='pt-4 text-lg font-medium'>Правила</p>
				{hostInfo.rules?.map((item, index) => (
					<AccordionItem className='-mt-4' key={index} value={`key-${index}`}>
						<AccordionTrigger className='text-base -my-2'>
							{/* {formatMessage({ id: 'aboutPage.rules' })} */}
							{`${index + 1}. ${item.nameRule}`}
						</AccordionTrigger>
						<AccordionContent className='text-base'>
							{item.descriptionRule}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}
