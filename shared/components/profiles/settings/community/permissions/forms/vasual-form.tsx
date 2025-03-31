import { Community, Role } from '@/payload-types'
import { Container } from '@/shared/components/container'
import { FormInput } from '@/shared/components/form'
import { Button } from '@/shared/components/ui/button'
import { ChevronLeft, Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
	data: Community
	selectedRoleId: number | null
	setSelectedRoleId: (id: number) => void
	communityRoles: Role[]
	setType: React.Dispatch<
		React.SetStateAction<'main' | 'visual' | 'permissions' | 'users'>
	>
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

const colorOptions = [
	'#FF0000',
	'#00FF00',
	'#0000FF',
	'#FFFF00',
	'#FF00FF',
	'#00FFFF',
	'#FFA500',
	'#800080',
	'#008000',
	'#000080',
	'#FFC0CB',
	'#A52A2A',
	'#808080',
	'#C0C0C0',
	'#FFD700',
	'#4B0082',
	'#F0E68C',
	'#D2691E',
	'#9ACD32',
	'#20B2AA'
]

export const VisualForm: React.FC<Props> = ({
	setType,
	data,
	communityRoles,
	selectedRoleId,
	setSelectedRoleId
}) => {
	const router = useRouter()

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

	const form = useForm({
		defaultValues: {
			roleTitle: selectedRole?.name || '',
			roleColor: selectedRole?.color || ''
		}
	})

	useEffect(() => {
		if (selectedRole) {
			form.reset({
				roleTitle: selectedRole.name,
				roleColor: selectedRole.color ?? ''
			})
		}
	}, [selectedRoleId, form, selectedRole])

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
			// После создания роли обновляем страницу и переключаемся на новую роль
			router.refresh()
			setSelectedRoleId(result.doc.id)
		} catch (error) {
			console.error('Ошибка при создании роли:', error)
		}
	}

	const isEveryoneRole = selectedRole?.name === '@everyone'

	const onSubmit = async (formData: {
		roleTitle: string
		roleColor: string
	}) => {
		try {
			const updateData = isEveryoneRole
				? { color: formData.roleColor }
				: { name: formData.roleTitle, color: formData.roleColor }

			const response = await fetch(`/api/roles/${selectedRole?.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updateData)
			})

			if (!response.ok) {
				throw new Error(`Ошибка обновления роли: ${response.status}`)
			}

			const result = await response.json()
			router.refresh()
			console.log('Роль обновлена:', result)
		} catch (error) {
			console.error('Ошибка при обновлении роли:', error)
		}
	}

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
												className='w-4 h-4 rounded-full'
												style={{ backgroundColor: role.color || '#000000' }}
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
					<p className='text-lg'>Редактировать роль - {selectedRole?.name}</p>
					<div className='flex justify-between items-center gap-4'>
						<div className='border-b-2 border-b-blue-600 cursor-pointer'>
							<p>Элементы отображения</p>
						</div>
						<div className='border-b-2 border-b-secondary hover:border-b-blue-600 cursor-pointer'>
							<p>Права доступа</p>
						</div>
						<div className='border-b-2 border-b-secondary hover:border-b-blue-600 cursor-pointer'>
							<p>Участники</p>
						</div>
					</div>
					<FormProvider {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormInput
								name='roleTitle'
								type='text'
								label='Название роли'
								placeholder='Название роли'
								disabled={isEveryoneRole}
								required
							/>
							<FormInput
								name='roleColor'
								type='text'
								label='Цвет роли'
								required
							/>
							<div className='flex mt-4 w-full justify-between items-center'>
								<div className='w-5/12'>
									<div
										className='w-14 h-14 border border-gray-300'
										style={{ backgroundColor: form.getValues('roleColor') }}
									/>
								</div>
								<div className='w-7/12 flex flex-wrap gap-2 pl-3'>
									{colorOptions.map((color, index) => (
										<div
											key={index}
											className='w-6 h-6 cursor-pointer border border-gray-300'
											style={{ backgroundColor: color }}
											onClick={() => form.setValue('roleColor', color)}
										/>
									))}
								</div>
							</div>
							<Button type='submit' variant='blue' className='px-10 mt-4'>
								Сохранить
							</Button>
						</form>
					</FormProvider>
				</div>
			</div>
		</Container>
	)
}
