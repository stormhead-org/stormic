'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Check,
	Crown,
	Gavel,
	Loader2,
	MoreVertical,
	Shield,
	ShieldCheck,
	ShieldQuestion,
} from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { UserAvatar } from '@/components/user-avatar'
import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfiles } from '@/types'
import { MemberRole } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useState } from 'react'

const roleIconMap = {
	GUEST: null,
	MODERATOR: <ShieldCheck className='h-4 w-4 ml-2 text-indigo-500' />,
	ADMIN: <Crown className='h-4 w-4 ml-2 text-rose-500' />,
}

export const MembersModal = () => {
	const router = useRouter()
	const { onOpen, isOpen, onClose, type, data } = useModal()
	const [loadingId, setLoadingId] = useState('')

	const isModalOpen = isOpen && type === 'members'
	const { server } = data as { server: ServerWithMembersWithProfiles }

	const onKick = async (memberId: string) => {
		try {
			setLoadingId(memberId)
			const url = qs.stringifyUrl({
				url: `/api/members/${memberId}`,
				query: {
					serverId: server?.id,
				},
			})
			const response = await axios.delete(url)

			router.refresh()
			onOpen('members', { server: response.data })
		} catch (error) {
			console.log(error)
		} finally {
			setLoadingId('')
		}
	}

	const onRoleChange = async (memberId: string, role: MemberRole) => {
		try {
			setLoadingId(memberId)
			const url = qs.stringifyUrl({
				url: `/api/members/${memberId}`,
				query: {
					serverId: server?.id,
				},
			})

			const response = await axios.patch(url, { role })

			router.refresh()
			onOpen('members', { server: response.data })
		} catch (error) {
			console.log(error)
		} finally {
			setLoadingId('')
		}
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className='bg-white text-black overflow-hidden'>
				<DialogHeader className='pt-6 px-6'>
					<DialogTitle className='text-2xl text-center font-bold'>
						Управление участниками
					</DialogTitle>
					<DialogDescription className='text-center text-zinc-500'>
						{server?.members?.length} участника/ов
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className='mt-8 max-h-[420px] pr-6'>
					{server?.members?.map(member => (
						<div key={member.id} className='flex items-center gap-x-2 mb-4'>
							<UserAvatar src={member.profile.imageUrl} />
							<div className='flex flex-col gap-y-1'>
								<div className='text-xs font-semibold flex items-center gap-x-1'>
									{member.profile.name}
									{roleIconMap[member.role]}
								</div>
								<p className='text-xs text-zinc-500'>{member.profile.email}</p>
							</div>
							{server.profileId !== member.profileId &&
								loadingId !== member.id && (
									<div className='ml-auto'>
										<DropdownMenu>
											<DropdownMenuTrigger>
												<MoreVertical className='h-4 w-4 text-zinc-500' />
											</DropdownMenuTrigger>
											<DropdownMenuContent side='left'>
												<DropdownMenuSub>
													<DropdownMenuSubTrigger className='flex items-center'>
														<ShieldQuestion className='h-4 w-4 mr-2' />
														<span>Роль</span>
													</DropdownMenuSubTrigger>
													<DropdownMenuPortal>
														<DropdownMenuSubContent>
															<DropdownMenuItem
																onClick={() =>
																	onRoleChange(member.id, 'MODERATOR')
																}
															>
																<ShieldCheck className='h-4 w-4 mr-2' />
																Модератор
																{member.role === 'MODERATOR' && (
																	<Check className='h-4 w-4 ml-auto' />
																)}
															</DropdownMenuItem>
															<DropdownMenuItem
																onClick={() => onRoleChange(member.id, 'GUEST')}
															>
																<Shield className='h-4 w-4 mr-2' />
																Участник
																{member.role === 'GUEST' && (
																	<Check className='h-4 w-4 ml-auto' />
																)}
															</DropdownMenuItem>
														</DropdownMenuSubContent>
													</DropdownMenuPortal>
												</DropdownMenuSub>
												<DropdownMenuSeparator />
												<DropdownMenuItem onClick={() => onKick(member.id)}>
													<Gavel className='w-4 h-4 mr-2' />
													Выгнать
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								)}
							{loadingId === member.id && (
								<Loader2 className='animate-spin text-zinc-500 ml-auto w-4 h-4' />
							)}
						</div>
					))}
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}
