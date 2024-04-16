'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'

export const UserButton = () => {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src={''} />
						<AvatarFallback className='bg-sky-500'>
							<User className='text-white' />
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				{/* <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent> */}
			</DropdownMenu>
		</>
	)
}
