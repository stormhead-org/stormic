'use client'

import { useSocket } from '@/shared/components/providers/items/socket-provider'
import { Badge } from '@/shared/components/ui/badge'

export const SocketIndicator = () => {
	const { isConnected } = useSocket()
	
	if (!isConnected) {
		return (
			<Badge variant='outline' className='bg-yellow-600 text-white border-none'>
				Polling
			</Badge>
		)
	}
	
	return (
		<Badge variant='outline' className='bg-emerald-600 text-white border-none'>
			Live
		</Badge>
	)
}
