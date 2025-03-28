import { Community, Media } from '@/payload-types'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem
} from '@/shared/components/ui/sidebar'
import { ImagePlus } from 'lucide-react'
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
	className
}) => {
	return (
		<Sidebar side='left' collapsible='icon'>
			<SelectCommunity
				communities={communities}
				selectedCommunityId={selectedCommunityId}
				setSelectedCommunityId={setSelectedCommunityId}
			/>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenuItem className='bg-transparent p-0 m-0'>
						<SidebarMenuButton className='bg-transparent hover:bg-transparent mx-0 mb-2 w-full text-primary cursor-default'>
							<ImagePlus size={16} />
							<span>Заглавное изображение</span>
						</SidebarMenuButton>
						<SidebarMenuSub className='bg-transparent p-0 m-0 rounded-md'>
							<SidebarMenuSubItem className='bg-transparent p-0 m-0'>
								<SidebarMenuSubButton className='bg-transparent p-0 m-0 w-full h-32'>
									<HeroImageUploader
										heroImage={heroImage}
										setHeroImage={setHeroImage}
									/>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
						</SidebarMenuSub>
					</SidebarMenuItem>

					{/* <SidebarMenuItem className='bg-transparent p-0 m-0'>
						<SidebarMenuButton className='bg-transparent hover:bg-transparent mx-0 mb-2 w-full text-primary cursor-default'>
							<ALargeSmall size={16} />
							<span>SEO</span>
						</SidebarMenuButton>
						<SidebarMenuSub className='bg-transparent p-0 m-0 rounded-md'>
							<SidebarMenuSubItem className='bg-transparent p-0 m-0'>
								<SidebarMenuSubButton className='bg-transparent p-0 m-0 w-full'>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										Заголовок поста для SEO оптимизации. Подробнее...
									</p>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
							<SidebarMenuSubItem className='bg-transparent p-0 m-0'>
								<SidebarMenuSubButton className='bg-transparent p-0 m-0 w-full'>
									<FormInput
										name='seotitle'
										// label={formatMessage({ id: 'loginForm.formInputEmailLabel' })}
										label='Заголовок'
										placeholder='Заголовок'
										required
									/>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
						</SidebarMenuSub>
					</SidebarMenuItem> */}
				</SidebarGroup>
			</SidebarContent>
			<UserProfile authorName={authorName} authorAvatar={authorAvatar} />
		</Sidebar>
	)
}
