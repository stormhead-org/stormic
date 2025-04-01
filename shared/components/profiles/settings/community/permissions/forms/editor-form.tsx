import { Community, FollowCommunity, Role } from '@/payload-types'
import { Container } from '@/shared/components/container'
import { ChevronLeft, Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import React, { useEffect } from 'react'
import { UsersForm } from './users-form'
import { VisualForm } from './vasual-form'

interface Props {
	data: Community
	selectedRoleId: number | null
	setSelectedRoleId: (id: number) => void
	communityRoles: Role[]
	communityUsers: FollowCommunity[]
	setType: React.Dispatch<React.SetStateAction<'main' | 'editor'>>
}

const isRole = (role: number | Role): role is Role => {
	return (
		typeof role === 'object' &&
		role !== null &&
		'id' in role &&
		'name' in role &&
		'color' in role
	)
}

export const EditorForm: React.FC<Props> = ({
	setType,
	data,
	communityRoles,
	communityUsers,
	selectedRoleId,
	setSelectedRoleId
}) => {
	const router = useRouter()

	const [typeEditor, setTypeEditor] = React.useState<
		'visual' | 'permissions' | 'users'
	>('visual')

	// Найдем роль @everyone
	const everyoneRole = communityRoles.find(
		(role): role is Role => isRole(role) && role.name === '@everyone'
	)

	// Если selectedRoleId не установлен, выберем @everyone
	useEffect(() => {
		if (!selectedRoleId && everyoneRole) {
			setSelectedRoleId(everyoneRole.id)
		}
	}, [selectedRoleId, everyoneRole, setSelectedRoleId])

	const selectedRole = communityRoles.find(
		(role): role is Role => isRole(role) && role.id === selectedRoleId
	)

	const handleSubmitNewRole = async () => {
		const newRoleData = {
			name: 'Новая роль',
			community: data.id
		}
		try {
			const response = await fetch('/api/roles', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newRoleData)
			})

			if (!response.ok) {
				throw new Error(`Ошибка создания роли: ${response.status}`)
			}

			const result = await response.json()
			router.refresh()
			setSelectedRoleId(result.doc.id)
		} catch (error) {
			console.error('Ошибка при создании роли:', error)
		}
	}

	const isEveryoneRole = selectedRole?.name === '@everyone'

	const handleSubmitDeleteRole = async (roleId: number) => {
		const roles = communityRoles.filter(isRole) || []
		const currentIndex = roles.findIndex(role => role.id === roleId)
		let nextRoleId: number | null = null

		if (currentIndex > 0) {
			nextRoleId = roles[currentIndex - 1].id
		} else if (roles.length > 1) {
			nextRoleId = roles[1].id
		} else {
			nextRoleId = everyoneRole?.id || null
		}

		try {
			const stringifiedQuery = qs.stringify(
				{
					where: {
						id: {
							equals: roleId
						},
						community: {
							equals: data.id
						}
					}
				},
				{ addQueryPrefix: true }
			)
			const req = await fetch(`/api/roles/${stringifiedQuery}`, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const result = await req.json()
			if (req.ok) {
				router.refresh()
				if (nextRoleId) {
					setSelectedRoleId(nextRoleId)
				}
			}
			return result
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Container className='bg-secondary rounded-md mt-1 p-4 w-full'>
			<div className='flex w-full gap-4'>
				<div className='w-1/3'>
					<div className='flex justify-between items-center'>
						<div
							className='flex items-center gap-2 pr-2 hover:bg-gray-700 cursor-pointer rounded-md'
							onClick={() => setType('main')}
						>
							<ChevronLeft size={18} />
							<p className='text-lg'>Назад</p>
						</div>
						<div className='group -my-7'>
							<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
								<Plus
									className='group-hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1 cursor-pointer font-bold'
									onClick={handleSubmitNewRole}
								/>
							</p>
						</div>
					</div>
					<div className='mt-2'>
						<div className='flex flex-col'>
							{communityRoles.filter(isRole).map(role => (
								<div
									key={role.id}
									className={`flex w-full p-2 cursor-pointer hover:bg-blue-800 rounded-md mt-2 ${
										selectedRoleId === role.id ? 'bg-blue-700' : 'bg-gray-700'
									}`}
									onClick={() => setSelectedRoleId(role.id)}
								>
									<div className='flex items-center justify-between w-full'>
										<div className='flex items-center gap-2'>
											<div
												className='w-4 h-4 rounded-md'
												style={{ backgroundColor: role.color || '#99AAB5' }}
											/>
											<div>{role.name}</div>
										</div>
										{role.name !== '@everyone' && (
											<div className='group -my-7'>
												<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
													<Trash2
														className='group-hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1'
														onClick={async () => {
															try {
																await handleSubmitDeleteRole(role.id)
															} catch (error) {
																console.error(
																	'Ошибка при удалении роли:',
																	error
																)
															}
														}}
													/>
												</p>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='w-2/3'>
					{selectedRole && (
						<>
							{typeEditor === 'visual' && (
								<VisualForm
									selectedRole={selectedRole}
									isEveryoneRole={isEveryoneRole}
									setTypeEditor={setTypeEditor}
								/>
							)}
							{typeEditor === 'users' && (
								<UsersForm
									selectedRole={selectedRole}
									isEveryoneRole={isEveryoneRole}
									communityUsers={communityUsers}
									setTypeEditor={setTypeEditor}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</Container>
	)
}
