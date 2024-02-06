'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfiles } from '@/types'
import { MemberRole } from '@prisma/client'
import {
	ChevronDown,
	LogOut,
	PlusCircle,
	Settings,
	Trash,
	UserPlus,
	Users,
} from 'lucide-react'

interface ServerHeaderProps {
	server: ServerWithMembersWithProfiles
	role?: MemberRole
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
	const { onOpen } = useModal()
	const isAdmin = role === MemberRole.ADMIN
	const isModerator = isAdmin || role === MemberRole.MODERATOR
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='focus:outline-none' asChild>
				<button className='w-full text-md font-semibold px-3 flex items-center h-12 hover:bg-zinc-700/10 dark:hover:bg-bgColorUiItem transition'>
					{server.name}
					<ChevronDown className='h-5 w-5 ml-auto' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'>
				{isModerator && (
					<DropdownMenuItem
						onClick={() => onOpen('invite', { server })}
						className='text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer'
					>
						Пригласить
						<UserPlus className='h-4 w-4 ml-auto' />
					</DropdownMenuItem>
				)}
				{isAdmin && (
					<DropdownMenuItem
						onClick={() => onOpen('editServer', { server })}
						className='px-3 py-2 text-sm cursor-pointer'
					>
						Настройки сервера
						<Settings className='h-4 w-4 ml-auto' />
					</DropdownMenuItem>
				)}
				{isAdmin && (
					<DropdownMenuItem
						onClick={() => onOpen('members', { server })}
						className='px-3 py-2 text-sm cursor-pointer'
					>
						Участники
						<Users className='h-4 w-4 ml-auto' />
					</DropdownMenuItem>
				)}
				{isModerator && (
					<DropdownMenuItem
						onClick={() => onOpen('createChannel')}
						className='px-3 py-2 text-sm cursor-pointer'
					>
						Создать канал
						<PlusCircle className='h-4 w-4 ml-auto' />
					</DropdownMenuItem>
				)}
				{isModerator && <DropdownMenuSeparator />}
				{isAdmin && (
					<DropdownMenuItem
						onClick={() => onOpen('deleteServer', { server })}
						className='text-rose-500 px-3 py-2 text-sm cursor-pointer'
					>
						Удалить сервер
						<Trash className='h-4 w-4 ml-auto' />
					</DropdownMenuItem>
				)}
				{!isAdmin && (
					<DropdownMenuItem
						onClick={() => onOpen('leaveServer', { server })}
						className='text-rose-500 px-3 py-2 text-sm cursor-pointer'
					>
						Покинуть сервер
						<LogOut className='h-4 w-4 ml-auto' />
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
