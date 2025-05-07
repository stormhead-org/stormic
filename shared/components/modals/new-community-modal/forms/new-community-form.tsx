import { Title } from '@/shared/components'
import { FormInput, FormTextarea } from '@/shared/components/form/'
import { Button } from '@/shared/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import { useIntl } from 'react-intl'
import { createCommunity } from '@/shared/utils/api/communities/createCommunity'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { formCommunitySchema, TFormCommunityValues } from './schemas'

interface Props {
	userId: number
	onClose?: VoidFunction
}

export const NewCommunityForm: React.FC<Props> = ({ userId, onClose }) => {
	// const { formatMessage } = useIntl()
	const router = useRouter()
	const form = useForm<TFormCommunityValues>({
		resolver: zodResolver(formCommunitySchema),
		defaultValues: {
			userId,
			title: '',
			description: ''
		}
	})

	const onSubmit = async (data: TFormCommunityValues) => {
		try {
			await createCommunity({
				userId: userId,
				title: data.title,
				description: data.description
			})
			toast.success('Сообщество успешно создано', {
				icon: '✅'
			})
			onClose?.()
			router.refresh()
		} catch (error) {
			return toast.error('Сообщество не создано', {
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
						<Title text='Новое сообщество' size='md' className='font-bold' />
						<p className='text-gray-400'>
							Создайте свое сообщество, которое покорит всех
						</p>
					</div>
				</div>

				<FormInput
					name='title'
					label='Название сообщества'
					placeholder='Stormic'
					required
				/>

				<FormTextarea
					name='description'
					label='Описание сообщества'
					placeholder='код, GitHub и ты'
				/>

				<Button
					variant='blue'
					loading={form.formState.isSubmitting}
					className='flex items-center gap-2 font-bold text-background rounded-xl'
					type='submit'
				>
					Создать
				</Button>
			</form>
		</FormProvider>
	)
}
