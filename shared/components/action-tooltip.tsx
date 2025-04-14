'use client'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/shared/components/ui/tooltip'

interface ActionTooltipProps {
	label: string
	children: React.ReactNode
	side?: 'top' | 'right' | 'bottom' | 'left'
	align?: 'start' | 'center' | 'end'
}

export const ActionTooltip = ({
	label,
	children,
	side,
	align
}: ActionTooltipProps) => {
	return (
		<>
			<TooltipProvider>
				<Tooltip delayDuration={50}>
					<TooltipTrigger asChild>{children}</TooltipTrigger>
					<TooltipContent className='bg-secondary' side={side} align={align}>
						<p className='text-semibold text-sm capitalize'>
							{label.toLowerCase()}
						</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	)
}
