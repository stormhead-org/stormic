import { useState, useEffect } from 'react'
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
import { useForm, FormProvider, useWatch } from 'react-hook-form'
import { HeroImageUploader } from './hero-image-uploader'
import { SelectCommunity } from './select-community'
import { UserProfile } from './user-profile'
import { FormInput, FormTextarea } from '../../form'
import Link from 'next/link'

interface Props {
	authorName: string
	authorAvatar?: string
	communities: Community[]
	selectedCommunityId: number | null
	setSelectedCommunityId: (id: number) => void
	heroImage: Media | undefined
	setHeroImage: (media: Media | undefined) => void
	setSeoTitle: (title: string) => void
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
	setSeoTitle,
	setSeoDescription,
	seoImage,
	setSeoImage,
	className
}) => {
	const seoForm = useForm({
		defaultValues: {
			seotitle: '',
			seodescription: ''
		}
	})

	// Отслеживаем изменения в полях формы
	const seotitle = useWatch({ control: seoForm.control, name: 'seotitle' })
	const seodescription = useWatch({
		control: seoForm.control,
		name: 'seodescription'
	})

	// Передаем значения в родительский компонент при изменении
	useEffect(() => {
		setSeoTitle(seotitle)
	}, [seotitle, setSeoTitle])

	useEffect(() => {
		setSeoDescription(seodescription)
	}, [seodescription, setSeoDescription])

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
										/>
									</SidebarMenuSubItem>
									<SidebarMenuSubItem className='bg-transparent p-0 m-0'>
										<SidebarGroupLabel className='mt-4'>
											<div>
												Должно быть от 50 до 60 символов. Для помощи в написании
												качественных метазаголовков см.
												<Link href='https://developers.google.com/search/docs/advanced/appearance/title-link#page-titles'>
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
										/>
									</SidebarMenuSubItem>
									<SidebarGroupLabel className='mt-4'>
										<div>
											Должно быть от 100 до 150 символов. Для помощи в написании
											качественных метаописаний см.
											<Link href='https://developers.google.com/search/docs/advanced/appearance/snippet#meta-descriptions'>
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
			<UserProfile authorName={authorName} authorAvatar={authorAvatar} />
		</Sidebar>
	)
}
