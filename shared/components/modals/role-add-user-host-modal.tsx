'use client'

import { HostRole, User } from '@/payload-types'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import { getMediaUrl, getRelationProp } from '@/shared/utils/payload/getTypes'
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
	users: User[]
	selectedRole: HostRole
}

export const RoleAddUserHostModal: React.FC<Props> = ({
	open,
	onClose,
	users,
	selectedRole
}) => {
	const handleClose = () => {
		onClose()
	}

	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [selectedUsers, setSelectedUsers] = useState<number[]>([])

	const filteredUsers =
		users?.filter((item): item is User & { user: User } => {
			const isAlreadyInRole =
				selectedRole.users?.some(user => {
					const userId = typeof user === 'object' && user?.id ? user.id : user
					return typeof item === 'object' && item.id
						? userId === item.id
						: userId === item
				}) || false

			const userName = getRelationProp<User, 'name'>(item, 'name', '')

			return (
				userName.toLowerCase().includes(searchTerm.toLowerCase()) &&
				!isAlreadyInRole
			)
		}) || []

	const handleSubmitAddUsers = async (roleId: number, userIds: number[]) => {
		const stringifiedQuery = qs.stringify(
			{
				where: {
					id: { equals: roleId }
				}
			},
			{ addQueryPrefix: true }
		)

		try {
			// Получаем текущую роль с её пользователями
			const getReq = await fetch(`/api/hostRoles${stringifiedQuery}`, {
				method: 'GET',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' }
			})
			const roleData = await getReq.json()
			if (!getReq.ok) {
				throw new Error('Ошибка при получении текущей роли')
			}

			// Текущий список пользователей роли
			const currentUsers = Array.isArray(roleData.docs[0]?.users)
				? roleData.docs[0].users.map((user: any) =>
						typeof user === 'object' && user?.id ? user.id : user
					)
				: []

			// Объединяем текущих пользователей с новыми, убираем дубликаты
			const updatedUsers = [...new Set([...currentUsers, ...userIds])]

			// Отправляем обновлённый список
			const patchReq = await fetch(`/api/hostRoles${stringifiedQuery}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ users: updatedUsers })
			})

			const data = await patchReq.json()
			if (!patchReq.ok) {
				throw new Error('Ошибка при обновлении роли: ' + JSON.stringify(data))
			}

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
													item.id,
													!selectedUsers.includes(item.id)
												)
											}
										>
											<Checkbox
												checked={selectedUsers.includes(item.id)}
												onClick={event => event.stopPropagation()}
												onCheckedChange={checked =>
													handleCheckboxChange(item.id, checked as boolean)
												}
												disabled={
													selectedUsers.length >= 30 &&
													!selectedUsers.includes(item.id)
												}
											/>
											<div className='flex justify-items-start items-center gap-2 bg-transparent text-primary'>
												<Avatar className='rounded-full'>
													<AvatarImage
														className='m-auto rounded-full'
														src={getMediaUrl(item.avatar, 'medium')}
														style={{ width: 34, height: 34 }}
													/>
													<AvatarFallback>
														<CircleUser />
													</AvatarFallback>
												</Avatar>
												<span>{item.name}</span>
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
