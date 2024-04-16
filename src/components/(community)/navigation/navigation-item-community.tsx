'use client'

import { ActionTooltip } from '@/components/action-tooltip'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

export const NavigationItemCommunity = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const communityTabActive = searchParams?.get('community')

	const onClick = () => {
		router.push('/community')
	}

	return (
		<>
			<ActionTooltip side='right' align='center' label='Сообщество'>
				<button className='group relative flex items-center' onClick={onClick}>
					<div
						className={cn(
							'absolute left-0 bg-primary rounded-r-full w-[4px] transition-all',
							communityTabActive !== 'community' && 'group-hover:h-[20px]',
							communityTabActive === 'community' ? 'h-[36px]' : 'h-[8px]'
						)}
					/>
					<div
						className={cn(
							'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
							communityTabActive === 'community' &&
								'bg-primary/10 text-primary rounded-[16px]'
						)}
					>
						<Image
							sizes='100%'
							fill
							src='https://utfs.io/f/b3784cf0-4ee6-477e-b4e0-a076eae9bb0c-agaih2.png'
							alt='Community'
						/>
					</div>
				</button>
			</ActionTooltip>
		</>
	)
}
