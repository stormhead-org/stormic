import { Community, Role } from '@/payload-types'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Switch } from '@/shared/components/ui/switch' // Импортируем Switch
import { getRelationProp } from '@/shared/utils/payload/getTypes'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
	selectedRole: Role
	isEveryoneRole?: boolean
	setTypeEditor: React.Dispatch<
		React.SetStateAction<'visual' | 'permissions' | 'users'>
	>
}

interface Permission {
	key: keyof Role
	label: string
	description?: string
}

const PERMISSIONS: Permission[] = [
	{
		key: 'COMMUNITY_ROLES_MANAGEMENT',
		label: 'Управление ролями',
		description:
			'Позволяет создавать, редактировать и удалять роли в сообществе'
	},
	{
		key: 'COMMUNITY_USER_BAN',
		label: 'Блокировать пользователей в сообществе',
		description: 'Позволяет блокировать участников сообщества'
	},
	{
		key: 'COMMUNITY_USER_MUTE',
		label: 'Заглушать пользователей в сообществе',
		description: 'Позволяет временно заглушать участников сообщества'
	},
	{
		key: 'COMMUNITY_POST_DELETE',
		label: 'Удалять посты в сообществе',
		description: 'Позволяет удалять посты участников в сообществе'
	},
	{
		key: 'COMMUNITY_POST_REMOVE_FROM_PUBLICATION',
		label: 'Снимать посты с публикации в сообществе',
		description: 'Позволяет снимать посты с публикации без их удаления'
	},
	{
		key: 'COMMUNITY_COMMENTS_DELETE',
		label: 'Удалять комментарии в сообществе',
		description: 'Позволяет удалять комментарии под постами в сообществе'
	}
]

export const PermissionsForm: React.FC<Props> = ({
	selectedRole,
	isEveryoneRole,
	setTypeEditor
}) => {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [permissions, setPermissions] = useState<Role>(selectedRole)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		setPermissions(selectedRole)
	}, [selectedRole])

	const filteredPermissions = PERMISSIONS.filter(perm =>
		perm.label.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handlePermissionChange = (key: keyof Role, value: boolean) => {
		setPermissions(prev => ({
			...prev,
			[key]: value
		}))
	}

	const handleSubmitPermissions = async () => {
		setIsLoading(true)

		const communityId = getRelationProp<Community, 'id'>(
			selectedRole.community,
			'id',
			0
		)

		const stringifiedQuery = qs.stringify(
			{
				where: {
					id: { equals: selectedRole.id },
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
					COMMUNITY_ROLES_MANAGEMENT: permissions.COMMUNITY_ROLES_MANAGEMENT,
					COMMUNITY_USER_BAN: permissions.COMMUNITY_USER_BAN,
					COMMUNITY_USER_MUTE: permissions.COMMUNITY_USER_MUTE,
					COMMUNITY_POST_DELETE: permissions.COMMUNITY_POST_DELETE,
					COMMUNITY_POST_REMOVE_FROM_PUBLICATION:
						permissions.COMMUNITY_POST_REMOVE_FROM_PUBLICATION,
					COMMUNITY_COMMENTS_DELETE: permissions.COMMUNITY_COMMENTS_DELETE
				})
			})
			if (req.ok) {
				router.refresh()
				toast.success('Права доступа обновлены!', {
					icon: '✅'
				})
			}
		} catch (err) {
			console.log(err)
			toast.error('Ошибка при обновлении прав доступа')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<p className='text-lg'>Редактировать роль - {selectedRole?.name}</p>
			<div className='flex justify-between items-center gap-4'>
				<div
					className='border-b-2 border-b-secondary hover:border-b-blue-600 cursor-pointer'
					onClick={() => setTypeEditor('visual')}
				>
					<p>Внешний вид</p>
				</div>
				<div className='border-b-2 border-b-blue-600 cursor-pointer'>
					<p>Права доступа</p>
				</div>
				{!isEveryoneRole ? (
					<div className='border-b-2 border-b-secondary hover:border-b-blue-600 cursor-pointer'>
						<p onClick={() => setTypeEditor('users')}>
							Участники ({selectedRole.users?.length})
						</p>
					</div>
				) : (
					<p className='text-gray-400'>Участники</p>
				)}
			</div>
			<div className='mt-4'>
				<div className='command-container'>
					<div className='flex gap-2'>
						<Input
							type='text'
							placeholder='Поиск по правам...'
							className='h-10 w-full px-2 rounded-md bg-gray-700'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<Button
							variant='blue'
							onClick={handleSubmitPermissions}
							className='px-6'
							disabled={isLoading}
							loading={isLoading}
						>
							Сохранить
						</Button>
					</div>
					<div className='mt-2'>
						{filteredPermissions.length === 0 ? (
							<div className='p-2 text-gray-500'>Права не найдены...</div>
						) : (
							<div className='flex flex-col gap-2'>
								{filteredPermissions.map(perm => (
									<div
										key={perm.key}
										className='flex items-center justify-between w-full p-2 rounded-md bg-gray-700 hover:bg-gray-600 cursor-pointer'
										onClick={() =>
											handlePermissionChange(
												perm.key,
												!permissions[perm.key] as boolean
											)
										}
									>
										<div className='flex flex-col'>
											<span className='text-primary'>{perm.label}</span>
											{perm.description && (
												<span className='text-sm text-gray-400'>
													{perm.description}
												</span>
											)}
										</div>
										<Switch
											checked={permissions[perm.key] as boolean}
											onCheckedChange={checked =>
												handlePermissionChange(perm.key, checked)
											}
											onClick={e => e.stopPropagation()}
										/>
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
