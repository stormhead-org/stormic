'use client'

import { NavigationMenu } from '@prisma/client'
import { LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { cn } from '../lib/utils'

interface Props {
	data: NavigationMenu[]
	className?: string
}

export const NavigationMenuForm: React.FC<Props> = ({ data, className }) => {
	const router = useRouter()
	const pathname = usePathname()
	
	return (
		<div className={cn('', className)}>
			{data.map(item => (
				<li
					key={item.id}
					className={cn(
						'flex items-center justify-between w-full h-12 rounded-[6px] hover:bg-blue-700 hover:text-white cursor-pointer mb-1',
						`${pathname === item.pageUrl ? 'bg-blue-800 text-white hover:bg-blue-800' : ''}`
					)}
					onClick={() => router.push(item.pageUrl)}
				>
					<Link href={item.pageUrl}>
						<div className='flex items-center gap-2 ml-2 text-lg font-bold'>
							<LinkIcon size={22} />
							{item.name}
						</div>
					</Link>
				</li>
			))}
		</div>
	)
}
