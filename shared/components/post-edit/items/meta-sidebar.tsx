'use client'

import { Community, Media } from '@/payload-types'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem
} from '@/shared/components/ui/sidebar'
import { ALargeSmall, ImagePlus } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, FormTextarea } from '../../form'
import { HeroImageUploader } from './hero-image-uploader'
import { SelectCommunity } from './select-community'
import { UserProfile } from './user-profile'

interface Props {
	authorName: string
	authorAvatar?: string
	communities: Community[]
	selectedCommunityId: number | null
	setSelectedCommunityId: (id: number) => void
	heroImage: Media | undefined
	setHeroImage: (media: Media | undefined) => void
	seotitle: string
	setSeoTitle: (title: string) => void
	seodescription: string
	setSeoDescription: (description: string) => void
	seoImage: Media | undefined
	setSeoImage: (media: Media | undefined) => void
	className?: string
}

export const MetaSidebar: React.FC<Props> = ({
	authorName,
	authorAvatar,
	communities,
	selectedCommunityId,
	setSelectedCommunityId,
	heroImage,
	setHeroImage,
	seotitle,
	setSeoTitle,
	seodescription,
	setSeoDescription,
	seoImage,
	setSeoImage,
	className
}) => {
	const seoForm = useForm({
		defaultValues: {
			seotitle: seotitle || '',
			seodescription: seodescription || ''
		}
	})

	// Синхронизация начальных значений при изменении внешних пропсов
	useEffect(() => {
		seoForm.reset({
			seotitle: seotitle || '',
			seodescription: seodescription || ''
		})
	}, [seotitle, seodescription, seoForm])

	// Обработчики изменения для передачи значений в родительский компонент
	const handleSeoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setSeoTitle(value)
	}

	const handleSeoDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const value = e.target.value
		setSeoDescription(value)
	}

	return (
		<Sidebar side='left' collapsible='icon' className={className}>
			<SelectCommunity
				communities={communities}
				selectedCommunityId={selectedCommunityId}
				setSelectedCommunityId={setSelectedCommunityId}
			/>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className='text-md'>
						<ImagePlus className='mr-2' size={16} /> Заглавное изображение
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenuItem className='bg-transparent px-1 m-0'>
							<SidebarMenuSub className='bg-transparent p-0 m-0 border-none'>
								<SidebarMenuSubItem className='bg-transparent p-0 m-0'>
									<HeroImageUploader
										heroImage={heroImage}
										setHeroImage={setHeroImage}
									/>
								</SidebarMenuSubItem>
							</SidebarMenuSub>
						</SidebarMenuItem>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel className='text-md'>
						<ALargeSmall className='mr-2' size={16} /> SEO
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenuItem className='bg-transparent p-0 m-0'>
							<SidebarMenuSub className='bg-transparent p-0 m-0 border-none'>
								<FormProvider {...seoForm}>
									<SidebarMenuSubItem className='bg-transparent px-1 mt-2'>
										<FormInput
											className='w-full bg-secondary'
											name='seotitle'
											placeholder='Заголовок'
											onChange={handleSeoTitleChange}
										/>
									</SidebarMenuSubItem>
									<SidebarMenuSubItem className='bg-transparent p-0 m-0'>
										<SidebarGroupLabel className='mt-4'>
											<div>
												Должно быть от 50 до 60 символов. Для помощи в написании
												качественных метазаголовков см.
												<Link
													target='_blank'
													href='https://developers.google.com/search/docs/advanced/appearance/title-link#page-titles'
												>
													лучшие практики.
												</Link>
											</div>
										</SidebarGroupLabel>
									</SidebarMenuSubItem>
									<SidebarMenuSubItem className='bg-transparent px-1 mt-6'>
										<FormTextarea
											name='seodescription'
											placeholder='Описание'
											className='bg-secondary'
											onChange={handleSeoDescriptionChange}
										/>
									</SidebarMenuSubItem>
									<SidebarGroupLabel className='mt-4'>
										<div>
											Должно быть от 100 до 150 символов. Для помощи в написании
											качественных метаописаний см.
											<Link
												target='_blank'
												href='https://developers.google.com/search/docs/advanced/appearance/snippet#meta-descriptions'
											>
												лучшие практики.
											</Link>
										</div>
									</SidebarGroupLabel>
									<SidebarGroupLabel className='mt-6 text-md'>
										Мета изображение
									</SidebarGroupLabel>
									<SidebarMenuSubItem className='bg-transparent px-1 m-0'>
										<HeroImageUploader
											heroImage={seoImage}
											setHeroImage={setSeoImage}
										/>
									</SidebarMenuSubItem>
								</FormProvider>
							</SidebarMenuSub>
						</SidebarMenuItem>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			{/* <UserProfile authorName={authorName} authorAvatar={authorAvatar} /> */}
		</Sidebar>
	)
}
