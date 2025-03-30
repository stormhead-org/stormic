import { Community, Role } from '@/payload-types'
import { Container } from '@/shared/components/container'
import { Title } from '@/shared/components/title'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { ChevronRight, Mail, User, Users } from 'lucide-react'
import React, { useState } from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	data: Community
	totalRoles: number
	setType: React.Dispatch<
		React.SetStateAction<'main' | 'visual' | 'permissions' | 'users'>
	>
}

export const MainForm: React.FC<Props> = ({ setType, data, totalRoles }) => {
	// const { formatMessage } = useIntl()
	const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null)
	const [searchTerm, setSearchTerm] = useState<string>('')

	const filteredRoles = data.roles?.docs?.filter(
		(role): role is Role =>
			typeof role === 'object' &&
			role.name.toLowerCase() !== 'everyone' &&
			role.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<Container className='bg-secondary rounded-md mt-1 p-4 w-full'>
			<p className='text-justify'>
				Используйте роли для создания групп с участниками сообщества и настройки
				их прав.
			</p>
			<div className='w-full border-b-2 border-b-blue-600 pb-4'>
				<Title text='Роли' size='sm' className='mt-2' />
			</div>
			<div className='flex mt-4 bg-gray-700 hover:bg-gray-600 cursor-pointer items-center justify-around rounded-md w-full'>
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
						<Button variant='blue' className='px-10'>
							Новая роль
						</Button>
					</div>
					<div className='flex w-full bg-secondary px-1 mt-2'>
						<div className='w-1/2'>
							<p>Роли - {totalRoles}</p>
						</div>
						<div className='w-1/2'>
							<p>Участники</p>
						</div>
					</div>
					<div className='mt-2 max-h-60 overflow-y-auto'>
						{filteredRoles?.length === 0 ? (
							<div className='p-2 text-gray-500'>Роль не найдена</div>
						) : (
							<div className='flex flex-col'>
								{filteredRoles?.map(role => (
									<div
										key={role.id}
										className={`flex w-full p-2 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md mt-2 ${
											selectedRoleId === role.id ? 'bg-gray-600' : ''
										}`}
										onClick={() => setSelectedRoleId(role.id)}
									>
										<div className='w-1/2'>{role.name}</div>
										<div className='w-1/2 flex items-center gap-1'>
											{role.users?.length || 0} <User size={18} />{' '}
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
