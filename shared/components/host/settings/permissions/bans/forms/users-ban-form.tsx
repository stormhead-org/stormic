'use client'

import { HostUsersBan, User } from '@/payload-types'
import { HostUsersBansModal } from '@/shared/components/modals/host-users-bans-modal'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { CircleUser, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import React, { useState } from 'react'

interface Props {
	currentUser: User
	users: User[]
	hostUsersBans: HostUsersBan[]
	setType: React.Dispatch<React.SetStateAction<'users' | 'communities'>>
}

export const UsersBanForm: React.FC<Props> = ({
	currentUser,
	users,
	hostUsersBans,
	setType
}) => {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [openAddUserModal, setOpenAddUserModal] = useState(false)

	// Фильтрация забаненных пользователей по поисковому запросу
	const filteredBans = hostUsersBans.filter(ban => {
		const user = ban.user as User
		return user.name.toLowerCase().includes(searchTerm.toLowerCase())
	})

	// Функция для разбана пользователя
	const handleSubmitDeleteBan = async (banId: number) => {
		try {
			const stringifiedQuery = qs.stringify(
				{
					where: {
						id: { equals: banId }
					}
				},
				{ addQueryPrefix: true }
			)
			const req = await fetch(`/api/hostUsersBans${stringifiedQuery}`, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (req.ok) {
				router.refresh()
			}
		} catch (err) {
			console.log('Ошибка при разбане пользователя:', err)
		}
	}

	return (
		<div className='mt-4'>
			<div className='flex justify-center items-center gap-4'>
				<div className='border-b-2 border-b-blue-600 cursor-pointer'>
					<p>Участники</p>
				</div>
				<div className='border-b-2 border-b-secondary hover:border-b-blue-600 cursor-pointer'>
					<p onClick={() => setType('communities')}>Сообщества</p>
				</div>
			</div>
			<div className='mt-4'>
				<div className='flex gap-2'>
					<Input
						type='text'
						placeholder='Поиск заблокированных участников...'
						className='h-10 w-full px-2 rounded-md bg-gray-700'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<HostUsersBansModal
						open={openAddUserModal}
						onClose={() => setOpenAddUserModal(false)}
						currentUser={currentUser}
						users={users}
						bannedUsers={hostUsersBans.map(ban => (ban.user as User).id)}
					/>
					<Button
						variant='blue'
						onClick={() => setOpenAddUserModal(true)}
						className='px-6'
					>
						Заблокировать
					</Button>
				</div>
				<div className='mt-2'>
					{filteredBans.length === 0 ? (
						<div className='p-2 text-gray-500'>
							Заблокированные участники не найдены
						</div>
					) : (
						<div className='flex flex-col'>
							{filteredBans.map(ban => {
								const user = ban.user as User
								const userAvatarUrl =
									typeof user.avatar === 'object'
										? getMediaUrl(user.avatar, '/logo.png')
										: '/logo.png'
								return (
									<div
										key={ban.id}
										className='flex w-full px-2 py-1 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md mt-2 items-center justify-between'
									>
										<div className='flex w-11/12'>
											<div className='w-full flex justify-items-start items-center gap-2 bg-transparent text-primary'>
												<Avatar className='rounded-full'>
													<AvatarImage
														className='m-auto rounded-full'
														src={userAvatarUrl}
														style={{ width: 34, height: 34 }}
													/>
													<AvatarFallback>
														<CircleUser />
													</AvatarFallback>
												</Avatar>
												<span>{user.name}</span>
											</div>
										</div>
										<div className='group -my-7 w-1/12'>
											<p className='flex p-1 items-center justify-end group-hover:text-blue-700 font-bold'>
												<X
													className='group-hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1'
													onClick={async () => {
														try {
															await handleSubmitDeleteBan(ban.id)
														} catch (error) {
															console.error(
																'Ошибка при разбане пользователя:',
																error
															)
														}
													}}
												/>
											</p>
										</div>
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
