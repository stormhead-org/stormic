import { Menu } from 'lucide-react'

import { ServerSidebar } from '@/components/(community)/server/server-sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export const MobileMemberToggle = ({ serverId }: { serverId: string }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost' size='icon' className='md:hidden'>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side='left' className='p-0 flex gap-0'>
				<div className='w-[72px]'>вфывфы</div>
				<ServerSidebar serverId={serverId} />
			</SheetContent>
		</Sheet>
	)
}
