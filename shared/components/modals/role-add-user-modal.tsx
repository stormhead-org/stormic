'use client'

import { FollowCommunity, Role } from '@/payload-types'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import { CircleUser, Shield } from 'lucide-react'
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
	avatar?: { url: string }
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
			// Получаем текущую роль с её пользователями
			const getReq = await fetch(`/api/roles${stringifiedQuery}`, {
				method: 'GET',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' }
			})
			const roleData = await getReq.json()
			if (!getReq.ok) {
				throw new Error('Ошибка при получении текущей роли')
			}

			console.log('Current role data:', JSON.stringify(roleData, null, 2))

			// Текущий список пользователей роли
			const currentUsers = Array.isArray(roleData.docs[0]?.users)
				? roleData.docs[0].users.map((user: any) =>
						typeof user === 'object' && user?.id ? user.id : user
					)
				: []

			console.log('Current users:', currentUsers)

			// Объединяем текущих пользователей с новыми, убираем дубликаты
			const updatedUsers = [...new Set([...currentUsers, ...userIds])]

			console.log('Updated users to send:', updatedUsers)

			// Отправляем обновлённый список
			const patchReq = await fetch(`/api/roles${stringifiedQuery}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ users: updatedUsers })
			})

			const data = await patchReq.json()
			if (!patchReq.ok) {
				throw new Error('Ошибка при обновлении роли: ' + JSON.stringify(data))
			}

			console.log('PATCH response:', JSON.stringify(data, null, 2))

			setSelectedUsers([])
			handleClose()
			router.refresh()
			return data
		} catch (err) {
			console.error('Ошибка при обновлении роли:', err)
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
			<DialogContent className='p-2 w-[40vw]'>
				<DialogHeader className='pt-8'>
					<DialogTitle className='text-2xl text-center font-bold'>
						Добавить участников
					</DialogTitle>
					<DialogDescription className='flex gap-1 items-center justify-center text-center text-xl'>
						<Shield
							className='w-6 h-6'
							style={{ color: selectedRole.color || '#99AAB5' }}
						/>
						{selectedRole.name}
					</DialogDescription>
					<DialogDescription>
						{selectedUsers.length === 0 ? (
							<>Выбрать до 30 участников</>
						) : (
							<>Выбрано {selectedUsers.length} участников</>
						)}
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
						<div className='mt-2 p-1 rounded-md'>
							{filteredUsers.length === 0 ? (
								<div className='p-2 text-gray-500'>Участники не найдены</div>
							) : (
								<div className='flex flex-col gap-2 w-full h-[40vh] overflow-auto'>
									{filteredUsers.map(item => (
										<div
											key={item.id}
											className='flex items-center gap-2 w-full px-2 py-1 cursor-pointer rounded-md bg-secondary hover:bg-gray-800'
											onClick={() =>
												handleCheckboxChange(
													item.user.id,
													!selectedUsers.includes(item.user.id)
												)
											}
										>
											<Checkbox
												checked={selectedUsers.includes(item.user.id)}
												onClick={event => event.stopPropagation()}
												onCheckedChange={checked =>
													handleCheckboxChange(item.user.id, checked as boolean)
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
					<Button variant='blue' onClick={handleClose} className='px-10'>
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
