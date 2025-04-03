import { Community, Role } from '@/payload-types'
import { Container } from '@/shared/components/container'
import { Title } from '@/shared/components/title'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { ChevronRight, Shield, Trash2, User, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import React, { useState } from 'react'

interface Props {
	data: Community
	communityRoles: Role[]
	selectedRoleId: number | null
	setSelectedRoleId: (id: number) => void
	setType: React.Dispatch<React.SetStateAction<'main' | 'editor'>>
}

export const MainForm: React.FC<Props> = ({
	setType,
	data,
	selectedRoleId,
	setSelectedRoleId,
	communityRoles
}) => {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState<string>('')

	const filteredRoles = communityRoles.filter(
		(role): role is Role =>
			typeof role === 'object' &&
			role.name.toLowerCase() !== '@everyone' &&
			role.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const everyoneRole = communityRoles.find(
		(role): role is Role =>
			typeof role === 'object' && role.name === '@everyone'
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
			return result
		} catch (error) {
			console.error('Ошибка роли:', error)
			throw error
		}
	}

	const handleSubmitDeleteRole = async (roleId: number) => {
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
		try {
			const req = await fetch(`/api/roles/${stringifiedQuery}`, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const data = await req.json()
			return data
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Container className='bg-secondary rounded-md mt-1 p-4 w-full'>
			<p className='text-justify'>
				Используйте роли для создания групп с участниками сообщества и настройки
				их прав.
			</p>
			<div className='w-full border-b-2 border-b-blue-600 pb-4'>
				<Title text='Роли' size='sm' className='mt-2' />
			</div>
			<div
				className='flex mt-4 bg-gray-700 hover:bg-gray-600 cursor-pointer items-center justify-around rounded-md w-full'
				onClick={() => {
					if (everyoneRole) {
						setSelectedRoleId(everyoneRole.id)
						setType('editor')
					}
				}}
			>
				<div className='flex items-center'>
					<Users size={28} />
					<div className='ml-4'>
						<p className='font-bold text-lg'>@everyone</p>
						<p className='text-gray-400 text-sm -mt-2'>
							Стандартные права для всех участников сообщества
						</p>
					</div>
				</div>
				<ChevronRight size={28} />
			</div>
			<div className='mt-4'>
				<div className='command-container'>
					<div className='flex gap-2'>
						<Input
							type='text'
							placeholder='Поиск роли...'
							className='h-10 w-full px-2 rounded-md bg-gray-700'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<Button
							variant='blue'
							onClick={async () => {
								try {
									const newRole = await handleSubmitNewRole()
									setSelectedRoleId(newRole.doc?.id)
									setType('editor')
									router.refresh()
								} catch (error) {
									console.error('Ошибка при создании роли:', error)
								}
							}}
							className='px-10'
						>
							Новая роль
						</Button>
					</div>
					<div className='flex w-full bg-secondary px-1 mt-2'>
						<div className='flex w-11/12'>
							<div className='w-1/2'>
								<p>Роли - {communityRoles.length - 1}</p>
							</div>
							<div className='w-1/2'>
								<p>Участники</p>
							</div>
						</div>
						<div className='w-1/12' />
					</div>
					<div className='mt-2'>
						{filteredRoles?.length === 0 ? (
							<div className='p-2 text-gray-500'>Роль не найдена</div>
						) : (
							<div className='flex flex-col'>
								{filteredRoles?.map(role => (
									<div
										key={role.id}
										className={`flex w-full p-2 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md mt-2 items-center justify-between ${
											selectedRoleId === role.id ? 'bg-gray-600' : ''
										}`}
									>
										<div
											className='flex w-11/12'
											onClick={() => {
												setSelectedRoleId(role.id)
												setType('editor')
											}}
										>
											<div className='w-1/2 flex items-center gap-2'>
												<Shield
													className='w-5 h-5'
													style={{ color: role.color || '99AAB5' }}
												/>
												{role.name}
											</div>
											<div className='w-1/2 flex items-center justify-between'>
												<div className='flex gap-1 items-center'>
													{role.users?.length || 0} <User size={18} />
												</div>
											</div>
										</div>
										<div className='group -my-7 w-1/12'>
											<p className='flex p-1 items-center group-hover:text-blue-700 font-bold'>
												<Trash2
													className='group-hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1'
													onClick={async () => {
														try {
															await handleSubmitDeleteRole(role.id)
															router.refresh()
														} catch (error) {
															console.error('Ошибка при удалении роли:', error)
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
		</Container>
	)
}
