'use client'

import { Video, VideoOff } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

import { ActionTooltip } from '@/components/action-tooltip'

export const ChatVideoButton = () => {
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	const isVideo = searchParams?.get('video')

	const onClick = () => {
		const url = qs.stringifyUrl(
			{
				url: pathname || '',
				query: {
					video: isVideo ? undefined : true
				}
			},
			{ skipNull: true }
		)

		router.push(url)
	}

	const Icon = isVideo ? VideoOff : Video
	const tooltipLabel = isVideo ? 'Завершить разговор' : 'Начать разговор'

	return (
		<ActionTooltip side="bottom" label={tooltipLabel}>
			<button onClick={onClick} className="hover:opacity-75 transition mr-4">
				<Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
			</button>
		</ActionTooltip>
	)
}
