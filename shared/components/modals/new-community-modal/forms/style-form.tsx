'use client'

import { Title } from '@/shared/components'
import { FileUpload } from '@/shared/components/file-upload'
import { Button } from '@/shared/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/shared/components/ui/form'
import { useModal } from '@/shared/hooks/use-modal-store'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'
import * as z from 'zod'
import { formLoginSchema, TFormLoginValues } from './schemas'

interface Props {
	onClose?: VoidFunction
	setType: React.Dispatch<
		React.SetStateAction<'name' | 'style' | 'register' | 'passwordReset'>
	>
}

const formSchema = z.object({
	fileUrl: z.string().min(1, {
		message: 'Прикрепите файл'
	})
})

export const CommunityStyleForm: React.FC<Props> = ({ setType, onClose }) => {
	const { formatMessage } = useIntl()
	
	const { type, data } = useModal()
	const router = useRouter()
	
	const { apiUrl, query } = data
	
	const formLogo = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fileUrl: ''
		}
	})
	
	const formBanner = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fileUrl: ''
		}
	})
	
	const isLoading = formLogo.formState.isSubmitting || formBanner.formState.isSubmitting
	
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const url = qs.stringifyUrl({
				url: apiUrl || '',
				query
			})
			
			await axios.post(url, {
				...values,
				content: values.fileUrl
			})
			
			formLogo.reset()
			formBanner.reset()
			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}

	return (
			<div
				className='flex flex-col gap-4'
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
				
				<Form {...formLogo}>
					<form onSubmit={formLogo.handleSubmit(onSubmit)}>
						<p className='flex justify-center'>
							Логотип
						</p>
						<div className='flex items-center justify-center text-center mt-2'>
							<FormField
								control={formLogo.control}
								name='fileUrl'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<FileUpload
												endpoint='messageFile'
												value={field.value}
												onChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
				
				<Form {...formBanner}>
					<form onSubmit={formBanner.handleSubmit(onSubmit)}>
							<p className='flex justify-center'>
								Баннер
							</p>
							<div className='flex items-center justify-center text-center mt-2'>
								<FormField
									control={formBanner.control}
									name='fileUrl'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<FileUpload
													endpoint='serverImage'
													value={field.value}
													onChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
					</form>
				</Form>
				
				
				
				<div className='flex justify-center gap-4'>
					<Button
						variant='blue'
						loading={formLogo.formState.isSubmitting || formBanner.formState.isSubmitting}
						className='flex items-center gap-2 text-sm font-bold w-1/2'
						type='submit'
						onClick={() => setType('name')}
					>
						Назад
					</Button>
					
					<Button
						variant='blue'
						loading={formLogo.formState.isSubmitting || formBanner.formState.isSubmitting}
						disabled={isLoading}
						className='flex items-center gap-2 text-sm font-bold w-1/2'
						type='submit'
						onClick={() => setType('style')}
					>
						Далее
					</Button>
				</div>
			</div>
	)
}
