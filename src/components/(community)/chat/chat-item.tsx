'use client'

import { ActionTooltip } from '@/components/action-tooltip'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserAvatar } from '@/components/user-avatar'
import { useModal } from '@/hooks/use-modal-store'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Member, MemberRole, Profile } from '@prisma/client'
import axios from 'axios'
import { Crown, Edit, FileIcon, ShieldCheck, Trash } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface ChatItemProps {
	id: string
	content: string
	member: Member & {
		profile: Profile
	}
	timestamp: string
	fileUrl: string | null
	deleted: boolean
	currentMember: Member
	isUpdated: boolean
	socketUrl: string
	socketQuery: Record<string, string>
}

const roleIconMap = {
	GUEST: null,
	MODERATOR: <ShieldCheck className='h-4 w-4 text-indigo-500 ml-2' />,
	ADMIN: <Crown className='h-4 w-4  text-rose-500 ml-2' />,
}

const formSchema = z.object({
	content: z.string().min(1),
})

export const ChatItem = ({
	id,
	content,
	member,
	timestamp,
	fileUrl,
	deleted,
	currentMember,
	isUpdated,
	socketUrl,
	socketQuery,
}: ChatItemProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const router = useRouter()
	const params = useParams()
	const { onOpen } = useModal()

	const onMemberClick = () => {
		if (member.id === currentMember.id) {
			return
		}

		router.push(
			`/community/servers/${params?.serverId}/conversations/${member.id}`
		)
	}

	useEffect(() => {
		const handleKeyDown = (event: any) => {
			if (event.key === 'Escape' || event.keyCode === 27) {
				setIsEditing(false)
			}
		}
		window.addEventListener('keydown', handleKeyDown)

		return () => window.removeEventListener('keyDown', handleKeyDown)
	}, [])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: content,
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const url = qs.stringifyUrl({
				url: `${socketUrl}/${id}`,
				query: socketQuery,
			})

			await axios.patch(url, values)

			form.reset()
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		form.reset({
			content: content,
		})
	}, [content])

	const fileType = fileUrl?.split('.').pop()

	const isAdmin = currentMember.role === MemberRole.ADMIN
	const isModerator = currentMember.role === MemberRole.MODERATOR
	const isOwner = currentMember.id === member.id
	const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner)
	const canEditMessage = !deleted && isOwner && !fileUrl
	const isPDF = fileType === 'pdf' && fileUrl
	const isImage = !isPDF && fileUrl

	return (
		<>
			<div className='relative group flex items-center hover:bg-black/5 p-4 transition w-full'>
				<div className='group flex gap-x-2 items-start w-full'>
					<div
						onClick={onMemberClick}
						className='cursor-pointer hover:drop-shadow-md transition'
					>
						<UserAvatar src={member.profile.imageUrl} />
					</div>
					<div className='flex flex-col w-full'>
						<div className='flex items-center gap-x-2'>
							<div className='flex items-center'>
								<p
									onClick={onMemberClick}
									className='font-semibold text-sm hover:underline cursor-pointer'
								>
									{member.profile.name}
								</p>
								<ActionTooltip label={member.role}>
									{roleIconMap[member.role]}
								</ActionTooltip>
							</div>
							<span className='text-xs text-zinc-500 dark:text-zinc-400'>
								{timestamp}
							</span>
						</div>
						{isImage && (
							<a
								href={fileUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='relative aspect-video rounded-md mt-2 overflow-hidden flex items-center bg-transparent h-auto w-1/4'
							>
								<Image
									src={fileUrl}
									alt={content}
									sizes='100%'
									fill
									priority
									className='object-cover'
								/>
							</a>
						)}
						{isPDF && (
							<div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
								<FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
								<a
									href={fileUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
								>
									PDF файл
								</a>
							</div>
						)}
						{!fileUrl && !isEditing && (
							<p
								className={cn(
									'text-sm text-zinc-600 dark:text-zinc-300',
									deleted &&
										'italic text-zinc-500 dark:text-zinc-400 text-xs mt-1'
								)}
							>
								{content}
								{isUpdated && !deleted && (
									<span className='text-[10px] mx-2 text-zinc-500 dark:text-zinc-400'>
										(ред.)
									</span>
								)}
							</p>
						)}
						{!fileUrl && isEditing && (
							<Form {...form}>
								<form
									className='flex items-center w-full gap-x-2 pt-2'
									onSubmit={form.handleSubmit(onSubmit)}
								>
									<FormField
										control={form.control}
										name='content'
										render={({ field }) => (
											<FormItem className='flex-1'>
												<FormControl>
													<div className='relative w-full'>
														<Input
															disabled={isLoading}
															className='p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200'
															placeholder='Edited message'
															{...field}
														/>
													</div>
												</FormControl>
											</FormItem>
										)}
									/>
									<Button disabled={isLoading} size='sm' variant='primary'>
										Сохранить
									</Button>
								</form>
								<span className='text-[10px] mt-1 text-zinc-400'>
									Нажмите Esc для отмены, enter чтобы сохранить
								</span>
							</Form>
						)}
					</div>
				</div>

				{canDeleteMessage && (
					<div className='hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-bgColorUiItem/60 border rounded-sm'>
						{canEditMessage && (
							<ActionTooltip label='Редактировать'>
								<Edit
									onClick={() => setIsEditing(true)}
									className='cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition'
								/>
							</ActionTooltip>
						)}
						<ActionTooltip label='Удалить'>
							<Trash
								onClick={() =>
									onOpen('deleteMessage', {
										apiUrl: `${socketUrl}/${id}`,
										query: socketQuery,
									})
								}
								className='cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition'
							/>
						</ActionTooltip>
					</div>
				)}
			</div>
		</>
	)
}
