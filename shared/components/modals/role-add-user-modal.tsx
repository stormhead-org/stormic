'use client'

import { FollowCommunity, Role } from '@/payload-types'
import {
	Dialog,
	DialogContent, DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import { ChevronRight, CircleUser, Shield, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'

interface Props {
	open: boolean
	onClose: () => void
	communityUsers: FollowCommunity[]
	selectedRole: Role
}

interface UserWithDetails {
	id: number
	name: string
	avatar?: {
		url: string
	}
}

export const RoleAddUserModal: React.FC<Props> = ({
	open,
	onClose,
	communityUsers,
	selectedRole
}) => {
	const handleClose = () => {
		onClose()
	}
	
	const router = useRouter()

	const [searchTerm, setSearchTerm] = useState<string>('')
	const [selectedUsers, setSelectedUsers] = useState<number[]>([])

	const filteredUsers =
		communityUsers?.filter(
			(item): item is FollowCommunity & { user: UserWithDetails } => {
				const isAlreadyInRole =
					selectedRole.users?.some(user => {
						const userId = typeof user === 'object' && user?.id ? user.id : user
						// Проверяем тип item.user
						return typeof item.user === 'object' && item.user?.id
							? userId === item.user.id
							: userId === item.user
					}) || false

				return (
					typeof item === 'object' &&
					item.user != null &&
					typeof item.user === 'object' &&
					'name' in item.user &&
					typeof item.user.name === 'string' &&
					item.user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
					!isAlreadyInRole
				)
			}
		) || []

	const handleSubmitAddUsers = async (roleId: number, userIds: number[]) => {
		const communityId =
			typeof selectedRole.community === 'object' && selectedRole.community?.id
				? selectedRole.community.id
				: selectedRole.community

		const stringifiedQuery = qs.stringify(
			{
				where: {
					id: { equals: roleId },
					community: { equals: communityId }
				}
			},
			{ addQueryPrefix: true }
		)
		try {
			const req = await fetch(`/api/roles/${stringifiedQuery}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					users: userIds
				})
			})
			const data = await req.json()
			if (req.ok) {
				setSelectedUsers([])
				handleClose()
				router.refresh()
			}
			return data
		} catch (err) {
			console.log(err)
		}
	}

	const handleCheckboxChange = (userId: number, checked: boolean) => {
		setSelectedUsers(prev => {
			if (checked) {
				if (prev.length < 30) {
					return [...prev, userId]
				}
				return prev
			} else {
				return prev.filter(id => id !== userId)
			}
		})
	}

	const handleAddSelectedUsers = async () => {
		if (selectedUsers.length > 0) {
			await handleSubmitAddUsers(selectedRole.id, selectedUsers)
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='p-2'>
				<DialogHeader className='pt-8'>
					<DialogTitle className='text-2xl text-center font-bold'>
						Добавить участников
					</DialogTitle>
					<DialogDescription className='flex gap-1 items-center justify-center text-center text-xl'>
						<Shield
							className='w-6 h-6'
							style={{ color: selectedRole.color || '99AAB5' }}
						/>
						{selectedRole.name}
					</DialogDescription>
					<DialogDescription>
						{selectedUsers.length === 0 ? (
							<>
								Выбрать до 30 участников
							</>
						) : (
							<>
							Выбрано {selectedUsers.length} участников
							</>
						)
						}
					</DialogDescription>
				</DialogHeader>
				<div className=''>
					<div className='command-container'>
						<div className='flex gap-2'>
							<Input
								type='text'
								placeholder='Поиск участников...'
								className='h-10 w-full px-2 rounded-md bg-secondary'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className='mt-2 bg-secondary p-1 rounded-md'>
							{filteredUsers.length === 0 ? (
								<div className='p-2 text-gray-500'>Участники не найдены</div>
							) : (
								<div className='flex flex-col w-full h-[30vh] overflow-auto'>
									{filteredUsers.map(item => (
										<div
											key={item.id}
											className='flex items-center gap-2 w-full px-2 py-1 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-800'
										>
												<Checkbox
													checked={selectedUsers.includes(item.user.id)}
													onCheckedChange={checked =>
														handleCheckboxChange(
															item.user.id,
															checked as boolean
														)
													}
													disabled={
														selectedUsers.length >= 30 &&
														!selectedUsers.includes(item.user.id)
													}
												/>
												<div className='flex justify-items-start items-center gap-2 bg-transparent text-primary'>
													<Avatar className='rounded-full'>
														<AvatarImage
															className='m-auto rounded-full'
															src={item.user.avatar?.url}
															style={{ width: 34, height: 34 }}
														/>
														<AvatarFallback>
															<CircleUser />
														</AvatarFallback>
													</Avatar>
													<span>{item.user.name}</span>
												</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
				<DialogFooter className='flex items-center gap-4 justify-items-end pb-2'>
					<Button
						variant='blue'
						onClick={() => handleClose()}
						className='px-10'
					>
						Отмена
					</Button>
					<Button
						variant='blue'
						onClick={handleAddSelectedUsers}
						disabled={selectedUsers.length === 0}
						className='px-6'
					>
						Добавить
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
