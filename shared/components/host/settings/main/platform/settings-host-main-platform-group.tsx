'use client'

import { type HostSetting, Media } from '@/payload-types'
import { Container, ProfileAvatar, Title } from '@/shared/components'
import { FormInput, FormTextarea } from '@/shared/components/form'
import {
	formSettingsHostSchema,
	type TFormSettingsHostValues
} from '@/shared/components/host/settings/form/schemas'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { settingsHost } from '@/shared/utils/api/host/settingsHost'
import { createMedia } from '@/shared/utils/api/media/createMedia'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
	ownerId: number
	host: HostSetting
}

export const SettingsHostMainPlatformGroup: React.FC<Props> = ({
	ownerId,
	host
}) => {
	const form = useForm<TFormSettingsHostValues>({
		resolver: zodResolver(formSettingsHostSchema),
		defaultValues: {
			title: host.title || '',
			slogan: host.slogan || '',
			description: host.description || '',
			email: host.contacts || ''
		}
	})
	const router = useRouter()

	const [logo, setLogo] = useState<Media | undefined>(
		host.logo && typeof host.logo === 'object'
			? (host.logo as Media)
			: undefined
	)
	const [banner, setBanner] = useState<Media | undefined>(
		host.banner && typeof host.banner === 'object'
			? (host.banner as Media)
			: undefined
	)
	const [authBanner, setAuthBanner] = useState<Media | undefined>(
		host.authBanner && typeof host.authBanner === 'object'
			? (host.authBanner as Media)
			: undefined
	)

	const logoInputRef = useRef<HTMLInputElement>(null)
	const bannerInputRef = useRef<HTMLInputElement>(null)
	const authBannerInputRef = useRef<HTMLInputElement>(null)

	const handleUploadLogo = async () => {
		const file = logoInputRef.current?.files?.[0]
		if (!file) {
			toast.error('Выберите файл для загрузки логотипа', { icon: '⚠️' })
			return
		}

		const formData = new FormData()
		formData.append('file', file)

		try {
			const result = await createMedia(formData)
			const newLogo = result.doc
			setLogo(newLogo)
			toast.success('Логотип успешно загружен', { icon: '✅' })
		} catch (error) {
			console.error('Error uploading logo:', error)
			toast.error('Ошибка при загрузке логотипа', { icon: '❌' })
		}
	}

	const handleUploadBanner = async () => {
		const file = bannerInputRef.current?.files?.[0]
		if (!file) {
			toast.error('Выберите файл для загрузки баннера', { icon: '⚠️' })
			return
		}

		const formData = new FormData()
		formData.append('file', file)

		try {
			const result = await createMedia(formData)
			const newBanner = result.doc
			setBanner(newBanner)
			toast.success('Баннер успешно загружен', { icon: '✅' })
		} catch (error) {
			console.error('Error uploading banner:', error)
			toast.error('Ошибка при загрузке баннера', { icon: '❌' })
		}
	}

	const handleUploadAuthBanner = async () => {
		const file = authBannerInputRef.current?.files?.[0]
		if (!file) {
			toast.error('Выберите файл для загрузки баннера окна авторизации', {
				icon: '⚠️'
			})
			return
		}

		const formData = new FormData()
		formData.append('file', file)

		try {
			const result = await createMedia(formData)
			const newAuthBanner = result.doc
			setAuthBanner(newAuthBanner)
			toast.success('Баннер окна авторизации успешно загружен', { icon: '✅' })
		} catch (error) {
			console.error('Error uploading banner:', error)
			toast.error('Ошибка при загрузке баннера окна авторизации', {
				icon: '❌'
			})
		}
	}

	const onSubmit = async (data: TFormSettingsHostValues) => {
		try {
			await settingsHost({
				ownerId: ownerId,
				logo: logo?.id,
				banner: banner?.id,
				authBanner: authBanner?.id,
				title: data.title,
				slogan: data.slogan,
				description: data.description,
				email: data.email?.length ? data.email : ''
			})
			toast.success('Сервер обновлен', { icon: '✅' })
			router.refresh()
		} catch (error) {
			console.error('Error in onSubmit:', error)
			toast.error('Ошибка при обновлении сервера', { icon: '❌' })
		}
	}

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<Container className='bg-secondary rounded-md mt-1 p-4'>
					<p className='text-justify'>
						{/* {formatMessage({ id: 'profilePageEditGroup.tipForSocial' })} */}
						Настройте то, что люди видят на странице информации о вашей
						платформе. Другие люди с большей вероятностью останется на вашей
						платформе и будут на нее возвращаться, если вся информация заполнена
						и добавлены изображения.
					</p>
					<div className='w-full border-b-2 border-b-blue-600 pb-4'>
						<Title
							// text={formatMessage({ id: 'profilePageEditGroup.titleBaseInfo' })}
							text='Основная информация'
							size='sm'
							className='mt-2'
						/>
					</div>
					<div
					// {...form}
					>
						<div
							className='mt-4'
							// onSubmit={handleSubmit(onSubmit)}
						>
							<div className='flex gap-4 w-full'>
								<div className='w-1/2'>
									<p className='mt-2'>
										{/* {formatMessage({ id: 'profilePageEditGroup.titleName' })} */}
										Название
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionName' })} */}
										Название вашей платформы
									</p>
									<FormInput
										name='title'
										type='text'
										placeholder='Stormic'
										className='mt-2'
									/>

									<p className='mt-4'>
										{/* {formatMessage({ id: 'profilePageEditGroup.titleName' })} */}
										Слоган
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionName' })} */}
										Лучшее использовать что-то короткое и емкое
									</p>
									<FormInput
										name='slogan'
										type='text'
										placeholder='код, GitHub и ты'
										className='mt-2'
									/>

									<p className='mt-4'>
										{/* {formatMessage({ id: 'profilePageEditGroup.titleAbout' })} */}
										Контактный e-mail
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionAbout' })} */}
										Почта для связи с владельцем платформы
									</p>

									<FormInput
										name='email'
										type='text'
										placeholder='stormic@stormhead.org'
										className='mt-2'
									/>
								</div>
								<div className='w-1/2'>
									<p className='mt-4'>
										{/* {formatMessage({ id: 'profilePageEditGroup.titleAbout' })} */}
										Описание
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionAbout' })} */}
										Расскажите о своей платформе
									</p>
									<FormTextarea
										name='description'
										// placeholder={formatMessage({ id: 'profilePageEditGroup.formInputAboutPlaceholder' })}
										placeholder=''
										className='mt-2'
									/>
								</div>
							</div>

							<div className='flex w-full mt-4 gap-4'>
								<div className='w-1/2'>
									<p className='mt-2'>
										{/* {formatMessage({ id: 'profilePageEditGroup.extraFields' })} */}
										Лого
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionExtraFields' })} */}
										Что-то аккуратное и милое. Однако, решать вам, конечно же
									</p>
									<div className='flex w-full justify-around mt-2 gap-4'>
										<div className='grid w-full max-w-sm items-center gap-1.5'>
											<Input
												id='logo'
												type='file'
												accept='image/*'
												ref={logoInputRef}
												className='rounded-md'
											/>
										</div>
										<Button
											variant='blue'
											type='button'
											onClick={handleUploadLogo}
											className='w-full'
										>
											Загрузить
										</Button>
									</div>
								</div>
								<div className='w-1/2'>
									<ProfileAvatar
										className='w-24 h-24 border-none bg-secondary hover:bg-secondary '
										avatarImage={logo?.url || ''}
										avatarSize={Number(92)}
									/>
								</div>
							</div>

							<div className='flex w-full mt-6 gap-4'>
								<div className='w-1/2'>
									<p className='mt-2'>
										{/* {formatMessage({ id: 'profilePageEditGroup.extraFields' })} */}
										Шапка
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionExtraFields' })} */}
										Шапка профиля сообщества
									</p>
									<div className='flex w-full justify-around mt-2 gap-4'>
										<div className='grid w-full max-w-sm items-center'>
											<Input
												id='banner'
												type='file'
												accept='image/*'
												ref={bannerInputRef}
												className='rounded-md'
											/>
										</div>
										<Button
											variant='blue'
											type='button'
											onClick={handleUploadBanner}
											className='w-full'
										>
											Загрузить
										</Button>
									</div>
								</div>
								<div className='w-1/2'>
									<ProfileAvatar
										className='w-24 h-24 border-none bg-secondary hover:bg-secondary '
										avatarImage={banner?.url || ''}
										avatarSize={Number(92)}
									/>
								</div>
							</div>

							<div className='flex w-full mt-6 gap-4'>
								<div className='w-1/2'>
									<p className='mt-2'>
										{/* {formatMessage({ id: 'profilePageEditGroup.extraFields' })} */}
										Баннер окна авторизации
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionExtraFields' })} */}
										Изображение, которое используется в окне авторизации
									</p>
									<div className='flex w-full justify-around mt-2 gap-4'>
										<div className='grid w-full max-w-sm items-center'>
											<Input
												id='authBanner'
												type='file'
												accept='image/*'
												ref={authBannerInputRef}
												className='rounded-md'
											/>
										</div>
										<Button
											variant='blue'
											type='button'
											onClick={handleUploadAuthBanner}
											className='w-full'
										>
											Загрузить
										</Button>
									</div>
								</div>
								<div className='w-1/2'>
									<ProfileAvatar
										className='w-24 h-24 border-none bg-secondary hover:bg-secondary '
										avatarImage={authBanner?.url || ''}
										avatarSize={Number(92)}
									/>
								</div>
							</div>

							<Button
								variant='blue'
								loading={form.formState.isSubmitting}
								className='text-base mt-6 w-full'
								type='submit'
							>
								{/* {formatMessage({ id: 'profilePageEditGroup.saveButton' })} */}
								Сохранить
							</Button>
						</div>
					</div>
				</Container>
			</form>
		</FormProvider>
	)
}
