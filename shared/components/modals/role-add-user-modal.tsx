'use client'

import { FollowCommunity, Role } from '@/payload-types'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import { CircleUser } from 'lucide-react'
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
				handleClose()
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
			<DialogContent className='min-w-[43vw] h-[78vh] p-0'>
				<DialogHeader className='hidden'>
					<DialogTitle />
				</DialogHeader>
				<div className='mt-4'>
					<div className='command-container'>
						<div className='flex gap-2'>
							<Input
								type='text'
								placeholder='Поиск участников...'
								className='h-10 w-full px-2 rounded-md bg-gray-700'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
							<Button
								variant='blue'
								onClick={handleAddSelectedUsers}
								disabled={selectedUsers.length === 0}
								className='px-6'
							>
								Добавить ({selectedUsers.length})
							</Button>
						</div>
						<div className='mt-2'>
							{filteredUsers.length === 0 ? (
								<div className='p-2 text-gray-500'>Участники не найдены</div>
							) : (
								<div className='flex flex-col'>
									{filteredUsers.map(item => (
										<div
											key={item.id}
											className='flex w-full p-1 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md mt-2 items-center justify-between'
										>
											<div className='flex w-full items-center gap-2'>
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
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
