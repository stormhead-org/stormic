'use client'

import { type Community, Media } from '@/payload-types'
import { Container, ProfileAvatar, Title } from '@/shared/components'
import { FormInput, FormTextarea } from '@/shared/components/form'
import {
	formSettingsCommunitySchema,
	TFormSettingsCommunityValues
} from '@/shared/components/modals/communities/settings/forms/schemas'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { settingsCommunity } from '@/shared/utils/api/communities/settingsCommunity'
import { createMedia } from '@/shared/utils/api/media/createMedia'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
	community: Community
}

export const SettingsCommunityMainGroup: React.FC<Props> = ({ community }) => {
	const form = useForm<TFormSettingsCommunityValues>({
		resolver: zodResolver(formSettingsCommunitySchema),
		defaultValues: {
			title: community.title || '',
			description: community.description || '',
			email: community.contacts || '',
			tableInfo: community.tableInfo
				? community.tableInfo.map(info => ({
						label: info.label ?? '',
						value: info.value ?? ''
				  }))
				: []
		}
	})
	const router = useRouter()

	const {
		fields: tableFields,
		append: appendTable,
		remove: removeTable
	} = useFieldArray({
		control: form.control,
		name: 'tableInfo'
	})

	const [logo, setLogo] = useState<Media | undefined>(
		community.logo && typeof community.logo === 'object'
			? (community.logo as Media)
			: undefined
	)
	const [banner, setBanner] = useState<Media | undefined>(
		community.banner && typeof community.banner === 'object'
			? (community.banner as Media)
			: undefined
	)

	const logoInputRef = useRef<HTMLInputElement>(null)
	const bannerInputRef = useRef<HTMLInputElement>(null)

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

	const onSubmit = async (data: TFormSettingsCommunityValues) => {
		try {
			const filteredTableInfo = data.tableInfo
				?.filter(
					info =>
						info.label &&
						info.label.trim() !== '' &&
						info.value &&
						info.value.trim() !== ''
				)
				.map(info => ({
					label: info.label,
					value: info.value
				}))

			await settingsCommunity({
				communityId: community.id,
				logo: logo?.id,
				banner: banner?.id,
				title: data.title,
				description: data.description,
				email: data.email?.length ? data.email : '',
				tableInfo: filteredTableInfo?.length ? filteredTableInfo : []
			})
			toast.success('Сообщество обновлено', { icon: '✅' })
			router.refresh()
		} catch (error) {
			console.error('Error in onSubmit:', error)
			toast.error('Ошибка при обновлении сообщества', { icon: '❌' })
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
						Настройте то, что люди видят в профиле вашего сообщества. Другие
						люди с большей вероятностью подпишутся на ваше сообщество и будут
						взаимодействовать с ним, если у него заполнен профиль и добавлено
						изображение.
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
										Лучшее использовать короткое и емкое название
									</p>
									<FormInput
										name='title'
										type='text'
										placeholder='Stormic'
										className='mt-2'
									/>
									<p className='mt-4'>
										{/* {formatMessage({ id: 'profilePageEditGroup.titleAbout' })} */}
										Описание
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionAbout' })} */}
										Расскажите о своем сообществе
									</p>
									<FormTextarea
										name='description'
										// placeholder={formatMessage({ id: 'profilePageEditGroup.formInputAboutPlaceholder' })}
										placeholder='код, GitHub и ты'
										className='mt-2'
										sideButton={false}
									/>

									<p className='mt-4'>
										{/* {formatMessage({ id: 'profilePageEditGroup.titleAbout' })} */}
										Контактный e-mail
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionAbout' })} */}
										Почта для связи с владельцем сообщества
									</p>

									<FormInput
										name='email'
										type='text'
										placeholder='stormic@stormhead.org'
										className='mt-2'
									/>
								</div>
								<div className='w-1/2'>
									{/* Таблица деталей */}
									<p className='mt-2'>
										{/* {formatMessage({ id: 'profilePageEditGroup.extraFields' })} */}
										Таблица деталей
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionExtraFields' })} */}
										Контактная информация, ссылки - все, что угодно
									</p>
									<div className='mt-2'>
										{tableFields.map((field, index) => (
											<div key={field.id} className='border p-4 rounded-md'>
												<div>
													<Label htmlFor={`tableInfo.${index}.label`}>
														Название
													</Label>
													<Input
														id={`tableInfo.${index}.label`}
														{...form.register(`tableInfo.${index}.label`, {
															required: 'Название обязательно'
														})}
														placeholder='Например, "Мой сайт"'
													/>
													{form.formState.errors.tableInfo?.[index]?.label && (
														<p className='text-red-500 text-sm'>
															{
																form.formState.errors.tableInfo[index].label
																	.message
															}
														</p>
													)}
												</div>
												<div>
													<Label htmlFor={`tableInfo.${index}.value`}>
														Значение
													</Label>
													<Input
														id={`tableInfo.${index}.value`}
														{...form.register(`tableInfo.${index}.value`, {
															required: 'Значение обязательно'
														})}
														placeholder='Например, "google.com"'
													/>
													{form.formState.errors.tableInfo?.[index]?.value && (
														<p className='text-red-500 text-sm'>
															{
																form.formState.errors.tableInfo[index].value
																	.message
															}
														</p>
													)}
												</div>
												<Button
													variant='destructive'
													type='button'
													onClick={() => removeTable(index)}
													className='mt-2'
												>
													Удалить деталь
												</Button>
											</div>
										))}
										{tableFields.length < 2 && (
											<Button
												variant='blue'
												type='button'
												onClick={() => appendTable({ label: '', value: '' })}
												className='mt-4'
											>
												Добавить деталь
											</Button>
										)}
									</div>
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
