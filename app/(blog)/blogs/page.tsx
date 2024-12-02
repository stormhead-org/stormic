import { prisma } from '@/prisma/prisma-client'
import { MainBannerForm, SortFeedButtons } from '@/shared/components'
import { redirect } from 'next/navigation'

export default async function BlogPage() {
	
	return (
		<>
			<div className=''>
				<h1>
					BLOG PAGE
				</h1>
			</div>
		</>
	)
}
