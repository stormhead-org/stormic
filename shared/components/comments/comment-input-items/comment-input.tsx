'use client'

import { EmojiPicker } from '@/shared/components/emoji-picker'
import { Form, FormControl, FormField, FormItem } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { useModal } from '@/shared/hooks/use-modal-store'
import { zodResolver } from '@hookform/resolvers/zod'

import axios from 'axios'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface ChatInputProps {
	apiUrl: string
	query: Record<string, any>
}

const formSchema = z.object({
	content: z.string().min(1)
})

export const CommentInput = ({ apiUrl, query }: ChatInputProps) => {
	const { onOpen } = useModal()
	const router = useRouter()
	
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: ''
		}
	})
	
	const isLoading = form.formState.isSubmitting
	
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const url = qs.stringifyUrl({
				url: apiUrl,
				query
			})
			await axios.post(url, values)
			form.reset()
			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}
	
	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='content'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className='relative p-4 pb-6'>
										<div className='flex group cursor-pointer items-center'>
											<button
												type='button'
												onClick={() => onOpen('messageFile', { apiUrl, query })}
												className='absolute top-[26px] left-7 group-hover:text-blue-700 font-bold transition rounded-full flex items-center justify-center'
											>
												<Plus className='group-hover:bg-blue-800/20 rounded-full w-7 h-7 p-1' />
											</button>
										</div>
										<Input
											disabled={isLoading}
											className='px-14 py-6 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
											// placeholder={`Начать общаться ${
											// 	type === 'conversation' ? 'c ' + name : 'в #' + name
											// }`}
											placeholder='Оставить комментарий'
											{...field}
										/>
										<div className='absolute top-7 right-8'>
											<EmojiPicker
												onChange={(emoji: string) =>
													field.onChange(`${field.value} ${emoji}`)
												}
											/>
										</div>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</>
	)
}
