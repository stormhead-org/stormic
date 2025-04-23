'use client'

import { SocialNavigation } from '@/payload-types'
import { Container, Title } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { updateSocialNavigation } from '@/shared/utils/api/host/updateSocialNavigation'
import { Facebook, Github, Globe, Instagram, Twitter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
	initialData: SocialNavigation
}

interface FormValues {
	twitter?: string | null
	mastodon?: string | null
	github?: string | null
	instagram?: string | null
	site?: string | null
}

export const SettingsHostMainSocialGroup: React.FC<Props> = ({
	initialData
}) => {
	const form = useForm<FormValues>({
		defaultValues: {
			twitter: initialData.twitter || '',
			mastodon: initialData.mastodon || '',
			github: initialData.github || '',
			instagram: initialData.instagram || '',
			site: initialData.site || ''
		}
	})
	const router = useRouter()

	const onSubmit = async (data: FormValues) => {
		try {
			await updateSocialNavigation({
				twitter: data.twitter || null,
				mastodon: data.mastodon || null,
				github: data.github || null,
				instagram: data.instagram || null,
				site: data.site || null
			})
			toast.success('Социальные сети успешно обновлены', { icon: '✅' })
			router.refresh()
		} catch (error) {
			console.error('Ошибка при сохранении социальных сетей:', error)
			toast.error('Ошибка при обновлении социальных сетей', { icon: '❌' })
		}
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<Container className='bg-secondary rounded-md mt-1 p-4'>
				<p className='text-justify'>
					Добавьте ссылки на ваши профили в социальных сетях. Оставьте поле
					пустым, чтобы отключить ссылку.
				</p>
				
				<div className='w-full border-b-2 border-b-blue-600 pb-4'>
					<Title
						// text={formatMessage({ id: 'profilePageEditGroup.titleBaseInfo' })}
						text='Редактирование социальных сетей'
						size='sm'
						className='mt-2'
					/>
				</div>

				{/* Поля для социальных сетей */}
				<div className='mt-4 space-y-4'>
					{[
						{ name: 'twitter', label: 'Twitter', icon: <Twitter size={24} /> },
						{
							name: 'mastodon',
							label: 'Mastodon',
							icon: (
								<img
									src="/icons/social/mastodon-icon.svg"
									alt="Mastodon icon"
									className="w-8 h-8 dark:filter dark:brightness-0 dark:invert"
								/>
							),
						},
						{ name: 'github', label: 'GitHub', icon: <Github size={24} /> },
						{
							name: 'instagram',
							label: 'Instagram',
							icon: <Instagram size={24} />
						},
						{ name: 'site', label: 'сайт', icon: <Globe size={24} /> }
					].map(social => (
						<div key={social.name} className='flex items-center gap-4'>
							<div className='w-10 flex items-center justify-center'>
								{social.icon}
							</div>
							<div className='flex-1'>
								<Input
									id={social.name}
									type='text'
									placeholder={`Введите ссылку на ${social.label}`}
									{...form.register(social.name as keyof FormValues)}
									className='mt-1'
								/>
							</div>
						</div>
					))}
				</div>

				{/* Кнопка сохранения */}
				<Button
					variant='blue'
					loading={form.formState.isSubmitting}
					className='text-base mt-6 w-full'
					type='submit'
				>
					Сохранить
				</Button>
			</Container>
		</form>
	)
}
