import { Title } from '@/shared/components'
import { FormInput } from '@/shared/components/form/'
import { Button } from '@/shared/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'
import { formLoginSchema, TFormLoginValues } from './schemas'

interface Props {
	onClose?: VoidFunction
	setType: React.Dispatch<
		React.SetStateAction<'name' | 'style' | 'register' | 'passwordReset'>
	>
}

export const CommunityStyleForm: React.FC<Props> = ({ setType, onClose }) => {
	const { formatMessage } = useIntl()
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false
			})

			if (!resp?.ok) {
				throw Error()
			}

			toast.success(String(formatMessage({ id: 'loginForm.toastSuccess' })), {
				icon: '✅'
			})

			onClose?.()
		} catch (error) {
			console.error('Error [LOGIN]', error)
			toast.error(String(formatMessage({ id: 'loginForm.toastError' })), {
				icon: '❌'
			})
		}
	}

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex justify-between items-center'>
					<div className='mr-2'>
						<Title
							text='Стилизация сообщества'
							size='md'
							className='font-bold'
						/>
						<p className='text-gray-400'>
							Визуальное оформление привлечет внимание новых участников и
							поможет создать культуру вашего сообщества! Вы можете обновить его
							в любое время.
						</p>
					</div>
				</div>

				<FormInput
					name='name'
					label='Название сообщества'
					placeholder='Казахстан'
					required
				/>

				<FormInput
					name='slug'
					label='Ссылка на сообщество (SLUG)'
					placeholder='kazakhstan-foreva'
					required
				/>

				<FormInput
					name='description'
					label='Описание сообщества'
					type='text'
					placeholder='Лучшее сообщество северного казахстана'
					required
				/>

				<div className='flex justify-center gap-4'>
					<Button
						variant='blue'
						loading={form.formState.isSubmitting}
						className='flex items-center gap-2 text-sm font-bold w-1/2'
						type='submit'
						onClick={() => setType('name')}
					>
						Назад
					</Button>

					<Button
						variant='blue'
						loading={form.formState.isSubmitting}
						className='flex items-center gap-2 text-sm font-bold w-1/2'
						type='submit'
						onClick={() => setType('style')}
					>
						Далее
					</Button>
				</div>
			</form>
		</FormProvider>
	)
}
