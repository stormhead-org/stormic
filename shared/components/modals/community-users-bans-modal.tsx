'use client'

import { FollowCommunity, User } from '@/payload-types'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import { getMediaUrl, getRelationProp } from '@/shared/utils/payload/getTypes'
import { CircleUser } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'

interface Props {
	currentUser: User
	communityUsers: FollowCommunity[]
	communityId: number
	open: boolean
	onClose: () => void
	bannedUsers: number[]
}

export const CommunityUsersBansModal: React.FC<Props> = ({
	currentUser,
	communityUsers,
	communityId,
	bannedUsers,
	open,
	onClose
}) => {
	const handleClose = () => {
		onClose()
	}

	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [selectedUsers, setSelectedUsers] = useState<number[]>([])

	const filteredUsers = communityUsers.filter(item => {
		const user = item.user as User
		const userName = getRelationProp<User, 'name'>(user, 'name', '')
		return (
			userName.toLowerCase().includes(searchTerm.toLowerCase()) &&
			!bannedUsers.includes(user.id) &&
			user.id !== currentUser.id
		)
	})

	const banUser = async (communityId: number, userId: number) => {
		try {
			const req = await fetch('/api/communityUsersBans', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					community: communityId,
					user: userId
				})
			})
			if (!req.ok) {
				throw new Error('Ошибка при бане пользователя')
			}
		} catch (err) {
			console.log('Ошибка при бане пользователя:', err)
			throw err
		}
	}

	const handleSubmitBanUsers = async (
		communityId: number,
		userIds: number[]
	) => {
		try {
			// Фильтруем только тех пользователей, которых ещё нет в bannedUsers
			const newUsersToBan = userIds.filter(
				userId => !bannedUsers.includes(userId)
			)
			if (newUsersToBan.length === 0) {
				handleClose()
				return
			}

			await Promise.all(
				newUsersToBan.map(userId => banUser(communityId, userId))
			)
			setSelectedUsers([])
			handleClose()
			router.refresh()
		} catch (err) {
			console.log('Ошибка при бане пользователей:', err)
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

	const handleBanSelectedUsers = async () => {
		if (selectedUsers.length > 0) {
			await handleSubmitBanUsers(communityId, selectedUsers)
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='p-2 w-[40vw]'>
				<DialogHeader className='pt-8'>
					<DialogTitle className='text-2xl text-center font-bold'>
						Заблокировать участников
					</DialogTitle>
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
									{filteredUsers.map(item => {
										const user = item.user as User
										const avatarImageUrl =
											typeof user === 'object'
												? getMediaUrl(user.avatar, '/logo.png')
												: '/logo.png'
										return (
											<div
												key={item.id}
												className='flex items-center gap-2 w-full px-2 py-1 cursor-pointer rounded-md bg-secondary hover:bg-gray-800'
												onClick={() =>
													handleCheckboxChange(
														user.id,
														!selectedUsers.includes(user.id)
													)
												}
											>
												<Checkbox
													checked={selectedUsers.includes(user.id)}
													onClick={event => event.stopPropagation()}
													onCheckedChange={checked =>
														handleCheckboxChange(user.id, checked as boolean)
													}
													disabled={
														selectedUsers.length >= 30 &&
														!selectedUsers.includes(user.id)
													}
												/>
												<div className='flex justify-items-start items-center gap-2 bg-transparent text-primary'>
													<Avatar className='rounded-full'>
														<AvatarImage
															className='m-auto rounded-full'
															src={avatarImageUrl}
															style={{ width: 34, height: 34 }}
														/>
														<AvatarFallback>
															<CircleUser />
														</AvatarFallback>
													</Avatar>
													<span>{user.name}</span>
												</div>
											</div>
										)
									})}
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
						onClick={handleBanSelectedUsers}
						disabled={selectedUsers.length === 0}
						className='px-6'
					>
						Заблокировать
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
