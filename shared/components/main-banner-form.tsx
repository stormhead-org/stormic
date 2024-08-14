import { cn } from '@/shared/lib/utils'
import { type StormicMedia, StormicSettings } from '@prisma/client'
import React from 'react'
import { SearchInput } from './search-input'

interface Props {
	stormicName: StormicSettings | null
	bannerUrl: StormicMedia | null
	className?: string
}

export const MainBannerForm: React.FC<Props> = ({ stormicName, bannerUrl, className }) => {
	const styling = {
		backgroundImage: `url('${String(bannerUrl?.url)}')`,
	}

	return (
		<div className={cn(className)}>
			<div
				className='rounded-md bg-cover bg-center bg-no-repeat w-full'
				style={styling}
			>
				<div className='py-10 text-center'>
					<span className='uppercase font-extrabold text-4xl [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)]'>
						{String(stormicName?.content)}
					</span>
				</div>
			</div>
			<SearchInput className='w-96 -mt-6' />
		</div>
	)
}
