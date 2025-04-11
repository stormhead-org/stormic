import { Post } from '@/payload-types'
import { cn } from '@/shared/lib/utils'
import React from 'react'
import { SearchInput } from './search-input'

interface Props {
	posts?: Post[]
	stormicName: string | null | undefined
	bannerUrl: string | null | undefined
	className?: string
}

export const MainBannerForm: React.FC<Props> = ({
	posts,
	stormicName,
	bannerUrl,
	className
}) => {
	const styling = {
		backgroundImage: `url('${String(bannerUrl)}')`
	}

	return (
		<div className={cn(className)}>
			<div
				className='rounded-md bg-cover bg-center bg-no-repeat w-full'
				style={styling}
			>
				<div className='py-10 text-center'>
					<span className='uppercase font-extrabold text-4xl [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)]'>
						{String(stormicName)}
					</span>
				</div>
			</div>
			{posts && <SearchInput posts={posts} className='w-96 -mt-6' />}
		</div>
	)
}
