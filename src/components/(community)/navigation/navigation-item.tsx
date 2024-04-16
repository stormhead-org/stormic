'use client'

import { ActionTooltip } from '@/components/action-tooltip'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

interface NavigationItemProps {
	id: string
	imageUrl: string
	name: string
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
	const params = useParams()
	const router = useRouter()

	const onClick = () => {
		router.push(`/community/servers/${id}`)
	}

	return (
		<>
			<ActionTooltip side='right' align='center' label={name}>
				<button className='group relative flex items-center' onClick={onClick}>
					<div
						className={cn(
							'absolute left-0 bg-primary rounded-r-full w-[4px] transition-all',
							params?.serverId !== id && 'group-hover:h-[20px]',
							params?.serverId === id ? 'h-[36px]' : 'h-[8px]'
						)}
					/>
					<div
						className={cn(
							'relative group flex mx-3 h-[48px] w-[48px] rounded-full group-hover:rounded-[16px] transition-all overflow-hidden dark:hover:bg-bgColorUiItem',
							params?.serverId === id &&
								'bg-primary/10 dark:bg-bgColorUiItem text-primary rounded-[16px]'
						)}
					>
						<Image
							sizes='100%'
							fill
							src={imageUrl}
							alt='Channel'
							className='object-cover'
						/>
					</div>
				</button>
			</ActionTooltip>
		</>
	)
}
