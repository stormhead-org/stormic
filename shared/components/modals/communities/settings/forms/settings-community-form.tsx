import { Title } from '@/shared/components'
import { FormInput } from '@/shared/components/form/'
import { Button } from '@/shared/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import { useIntl } from 'react-intl'
import { Community } from '@/payload-types'
import { settingsCommunity } from '@/shared/utils/api/communities/settingsCommunity'
import { toast } from 'sonner'
import {
	formSettingsCommunitySchema,
	TFormSettingsCommunityValues
} from './schemas'

interface Props {
	community: Community
	onClose?: VoidFunction
}

export const SettingsCommunityForm: React.FC<Props> = ({
	community,
	onClose
}) => {
	// const { formatMessage } = useIntl()
	const form = useForm<TFormSettingsCommunityValues>({
		resolver: zodResolver(formSettingsCommunitySchema),
		defaultValues: {
			title: '',
			description: ''
		}
	})

	const onSubmit = async (data: TFormSettingsCommunityValues) => {
		try {
			await settingsCommunity({
				title: data.title,
				description: data.description
			})
			toast.success('Сообщество успешно создано', {
				icon: '✅'
			})
			onClose?.()
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
						<Title
							text='Настройки сообщества'
							size='md'
							className='font-bold'
						/>
						<p className='text-gray-400'>
							Настройте и стилизуйте сообщество так, как хочется вам и вашему
							сообществу
						</p>
					</div>
				</div>

				<FormInput
					name='title'
					label='Название сообщества'
					placeholder={community.title}
					required
				/>

				<FormInput
					name='description'
					label='Описание сообщества'
					type='text'
					placeholder={community.communityDescription || 'код, GitHub и ты'}
				/>

				<Button
					variant='blue'
					loading={form.formState.isSubmitting}
					className='flex items-center gap-2 text-sm font-bold'
					type='submit'
				>
					Создать
				</Button>
			</form>
		</FormProvider>
	)
}
