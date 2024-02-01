'use client'

import { ActionTooltip } from '@/components/action-tooltip'
import { useModal } from '@/hooks/use-modal-store'
import { useOrigin } from '@/hooks/use-origin'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

interface ServerListProps {
	id: string
	imageUrl: string
	name: string
}

export const ServerList = ({ id, imageUrl, name }: ServerListProps) => {
	const params = useParams()
	const router = useRouter()

	const { data } = useModal()
	const origin = useOrigin()

	const { server } = data

	const inviteUrl = `${origin}/community/invite/${server?.inviteCode}`

	const onClick = () => {
		router.push(inviteUrl)
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
							'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
							params?.serverId === id &&
								'bg-primary/10 text-primary rounded-[16px]'
						)}
					>
						<Image sizes='100%' fill src={imageUrl} alt='Channel' />
					</div>
				</button>
			</ActionTooltip>
		</>
	)
}
