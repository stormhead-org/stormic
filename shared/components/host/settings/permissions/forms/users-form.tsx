import { FollowCommunity, Role, User } from '@/payload-types'
import { RoleAddUserModal } from '@/shared/components/modals/role-add-user-modal'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { CircleUser, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import React, { useEffect, useState } from 'react'

interface Props {
	selectedRole: Role
	isEveryoneRole: boolean
	communityUsers: FollowCommunity[]
	setTypeEditor: React.Dispatch<
		React.SetStateAction<'visual' | 'permissions' | 'users'>
	>
}

export const UsersForm: React.FC<Props> = ({
	selectedRole,
	isEveryoneRole,
	setTypeEditor,
	communityUsers
}) => {
	useEffect(() => {
		if (isEveryoneRole) {
			setTypeEditor('visual')
		}
	}, [isEveryoneRole, setTypeEditor])

	const router = useRouter()
	const [openAddUserModal, setOpenAddUserModal] = React.useState(false)
	const [searchTerm, setSearchTerm] = useState<string>('')

	const filteredUsers =
		selectedRole.users?.filter((user): user is User => {
			return (
				typeof user === 'object' &&
				user != null && // Убеждаемся, что user не null/undefined
				'name' in user && // Проверяем наличие поля name
				typeof user.name === 'string' && // Убеждаемся, что name — строка
				user.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}) || []

	const handleSubmitDeleteUserRole = async (
		roleId: number,
		userIdToRemove: number
	) => {
		const communityId =
			typeof selectedRole.community === 'object' && selectedRole.community?.id
				? selectedRole.community.id
				: selectedRole.community

		const updatedUsers = (selectedRole.users || [])
			.map(user => (typeof user === 'object' && user?.id ? user.id : user))
			.filter(id => id !== userIdToRemove)

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
					users: updatedUsers
				})
			})
			const data = await req.json()
			if (req.ok) {
				router.refresh()
			}
			return data
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<p className='text-lg'>Редактировать роль - {selectedRole?.name}</p>
			<div className='flex justify-between items-center gap-4'>
				<div className='border-b-2 border-b-secondary hover:border-b-blue-600 cursor-pointer'>
					<p onClick={() => setTypeEditor('visual')}>Внешний вид</p>
				</div>
				<div className='border-b-2 border-b-secondary hover:border-b-blue-600 cursor-pointer'>
					<p onClick={() => setTypeEditor('permissions')}>Права доступа</p>
				</div>
				<div className='border-b-2 border-b-blue-600 cursor-pointer'>
					<p>Участники ({selectedRole.users?.length})</p>
				</div>
			</div>
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
						<RoleAddUserModal
							open={openAddUserModal}
							onClose={() => setOpenAddUserModal(false)}
							communityUsers={communityUsers}
							selectedRole={selectedRole}
						/>
						<Button
							variant='blue'
							onClick={() => setOpenAddUserModal(true)}
							className='px-6'
						>
							Добавить участников
						</Button>
					</div>
					<div className='mt-2'>
						{filteredUsers.length === 0 ? (
							<div className='p-2 text-gray-500'>Участники не найдены</div>
						) : (
							<div className='flex flex-col'>
								{filteredUsers.map(user => (
									<div
										key={user.id}
										className='flex w-full p-1 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md mt-2 items-center justify-between'
									>
										<div className='flex w-11/12'>
											<div className='w-full flex justify-items-start items-center gap-2 bg-transparent text-primary'>
												<Avatar className='rounded-full'>
													<AvatarImage
														className='m-auto rounded-full'
														src={
															typeof user.avatar === 'object' &&
															user.avatar?.url
																? user.avatar.url
																: undefined
														}
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
											<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
												<X
													className='group-hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1'
													onClick={async () => {
														try {
															await handleSubmitDeleteUserRole(
																selectedRole.id,
																user.id
															)
														} catch (error) {
															console.error(
																'Ошибка при удалении пользователя из роли:',
																error
															)
														}
													}}
												/>
											</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
