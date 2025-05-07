import { Role } from '@/payload-types'
import { FormInput } from '@/shared/components/form'
import { Button } from '@/shared/components/ui/button'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const colorOptions = [
	'#1ABC9C',
	'#2ECC71',
	'#3498DB',
	'#9B59B6',
	'#E91E63',
	'#F1C40F',
	'#E67E22',
	'#E74C3C',
	'#95A5A6',
	'#607D8B',
	'#11806A',
	'#1F8B4C',
	'#206694',
	'#71368A',
	'#AD1457',
	'#C27C0E',
	'#A84300',
	'#992D22',
	'#979C9F',
	'#546E7A'
]

interface Props {
	selectedRole: Role
	isEveryoneRole?: boolean
	setTypeEditor: React.Dispatch<
		React.SetStateAction<'visual' | 'permissions' | 'users'>
	>
}

export const VisualForm: React.FC<Props> = ({
	selectedRole,
	isEveryoneRole,
	setTypeEditor
}) => {
	const router = useRouter()

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
	}, [selectedRole.id, form, selectedRole])

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
		} catch (error) {
			console.error('Ошибка при обновлении роли:', error)
		}
	}
	return (
		<>
			<p className='text-lg my-2 lg:my-0'>
				Редактировать роль - {selectedRole?.name}
			</p>
			<div className='flex w-full justify-between items-center gap-4 overflow-x-auto'>
				<div className='border-b-2 border-b-theme cursor-pointer'>
					<span>Внешний вид</span>
				</div>
				<div className='border-b-2 border-b-secondary hover:border-b-theme cursor-pointer'>
					<span onClick={() => setTypeEditor('permissions')}>
						Права доступа
					</span>
				</div>
				{!isEveryoneRole ? (
					<div className='border-b-2 border-b-secondary hover:border-b-theme cursor-pointer'>
						<span onClick={() => setTypeEditor('users')}>
							Участники ({selectedRole.users?.length})
						</span>
					</div>
				) : (
					<p className='text-gray-400'>Участники</p>
				)}
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
					<FormInput name='roleColor' type='text' label='Цвет роли' required />
					<div className='flex mt-4 w-full justify-between items-center'>
						<div className='flex w-5/12 gap-2'>
							<div>
								<div
									className='flex w-14 h-14 rounded-md cursor-pointer justify-center items-center'
									style={{ backgroundColor: '#99AAB5' }}
									onClick={() => form.setValue('roleColor', '#99AAB5')}
								>
									{form.getValues('roleColor') === '#99AAB5' && (
										<Check size={36} />
									)}
								</div>
							</div>
							<div>
								{form.getValues('roleColor') !== '#99AAB5' && (
									<div
										className='w-14 h-14 rounded-md'
										style={{ backgroundColor: form.getValues('roleColor') }}
									/>
								)}
							</div>
						</div>
						<div className='w-7/12 flex flex-wrap gap-2 pl-3'>
							{colorOptions.map((color, index) => (
								<div
									key={index}
									className='w-6 h-6 cursor-pointer rounded-md'
									style={{ backgroundColor: color }}
									onClick={() => form.setValue('roleColor', color)}
								/>
							))}
						</div>
					</div>
					<Button
						type='submit'
						variant='blue'
						className='px-10 mt-4 bg-primary/5 hover:bg-theme-hover/80 text-foreground hover:text-background rounded-xl w-full'
					>
						Сохранить
					</Button>
				</form>
			</FormProvider>
		</>
	)
}
