'use client'

import { Media, User } from '@/payload-types'
import { Container, ProfileAvatar, Title } from '@/shared/components'
import { FormInput, FormTextarea } from '@/shared/components/form'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { createMedia } from '@/shared/utils/api/media/createMedia'
import { settingsUser } from '@/shared/utils/api/users/settingsUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
	formSettingsUserSchema,
	TFormSettingsUserValues
} from '../../forms/schemas'

interface Props {
	user: User
}

export const SettingsProfileEditGroup: React.FC<Props> = ({ user }) => {
	const form = useForm<TFormSettingsUserValues>({
		resolver: zodResolver(formSettingsUserSchema),
		defaultValues: {
			name: user.name || '',
			description: user.description || '',
			tableInfo: user.tableInfo
				? user.tableInfo.map(info => ({
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

	const [avatar, setAvatar] = useState<Media | undefined>(
		user.avatar && typeof user.avatar === 'object'
			? (user.avatar as Media)
			: undefined
	)
	const [banner, setBanner] = useState<Media | undefined>(
		user.banner && typeof user.banner === 'object'
			? (user.banner as Media)
			: undefined
	)

	const avatarInputRef = useRef<HTMLInputElement>(null)
	const bannerInputRef = useRef<HTMLInputElement>(null)

	const handleUploadAvatar = async () => {
		const file = avatarInputRef.current?.files?.[0]
		if (!file) {
			toast.error('Выберите файл для загрузки логотипа', { icon: '⚠️' })
			return
		}

		const formData = new FormData()
		formData.append('file', file)

		try {
			const result = await createMedia(formData)
			const newAvatar = result.doc
			setAvatar(newAvatar)
			toast.success('Аватар успешно загружен', { icon: '✅' })
		} catch (error) {
			console.error('Error uploading logo:', error)
			toast.error('Ошибка при загрузке аватарки', { icon: '❌' })
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

	const onSubmit = async (data: TFormSettingsUserValues) => {
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

			await settingsUser({
				userId: user.id,
				avatar: avatar?.id,
				banner: banner?.id,
				name: data.name,
				description: data.description,
				tableInfo: filteredTableInfo?.length ? filteredTableInfo : []
			})
			toast.success('Профиль обновлен', { icon: '✅' })
			router.refresh()
		} catch (error) {
			console.error('Error in onSubmit:', error)
			toast.error('Ошибка при обновлении профиля', { icon: '❌' })
		}
	}

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<Container className='bg-secondary rounded-xl mt-1 p-4'>
					<p className='text-justify'>
						{/* {formatMessage({ id: 'profilePageEditGroup.tipForSocial' })} */}
						Настройте то, что люди видят в вашем профиле. Другие люди с большей
						вероятностью подпишутся на Вас и будут взаимодействовать с вами,
						если у Вас заполнен профиль и добавлено изображение.
					</p>
					<div className='w-full border-b-2 border-b-theme pb-4'>
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
							<div className='lg:flex gap-4 w-full'>
								<div className='w-full lg:w-1/2'>
									<p className='mt-2'>
										{/* {formatMessage({ id: 'profilePageEditGroup.titleName' })} */}
										Отображаемое имя
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionName' })} */}
										Ваше полное имя или псевдоним
									</p>
									<FormInput
										name='name'
										type='text'
										placeholder='Stormhead'
										className='mt-2'
									/>
									<p className='mt-4'>
										{/* {formatMessage({ id: 'profilePageEditGroup.titleAbout' })} */}
										О себе
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionAbout' })} */}
										Расскажите миру немного о себе
									</p>
									<FormTextarea
										name='description'
										// placeholder={formatMessage({ id: 'profilePageEditGroup.formInputAboutPlaceholder' })}
										placeholder='Я бы многое мог рассказать, но не хочу...'
										className='mt-2'
									/>
								</div>
								<div className='w-full lg:w-1/2 mt-2'>
									{/* Таблица деталей */}
									<p className='mt-2'>
										{/* {formatMessage({ id: 'profilePageEditGroup.extraFields' })} */}
										Таблица деталей
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionExtraFields' })} */}
										Ваша домашняя страница, возраст - все, что угодно
									</p>
									<div className='mt-2'>
										{tableFields.map((field, index) => (
											<div
												key={field.id}
												className='border-b border-theme pb-4'
											>
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
														placeholder='Например, "https://stormic.app"'
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
													className='mt-2 rounded-xl text-foreground w-full'
												>
													Удалить деталь
												</Button>
											</div>
										))}
										{tableFields.length < 2 && (
											<Button
												variant='secondary'
												type='button'
												onClick={() => appendTable({ label: '', value: '' })}
												className='mt-4 bg-primary/5 hover:bg-theme-hover/80 text-foreground hover:text-background rounded-xl w-full'
											>
												Добавить деталь
											</Button>
										)}
									</div>
								</div>
							</div>

							<div className='lg:flex w-full mt-4 gap-4'>
								<div className='w-full lg:w-1/2'>
									<p className='mt-2'>
										{/* {formatMessage({ id: 'profilePageEditGroup.extraFields' })} */}
										Аватар
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionExtraFields' })} */}
										Что-то аккуратное и милое. Однако, решать вам, конечно же
									</p>
									<div className='flex w-full justify-around mt-2 gap-4'>
										<div className='grid w-full max-w-sm items-center gap-1.5'>
											<Input
												id='avatar'
												type='file'
												accept='image/*'
												ref={avatarInputRef}
												className='rounded-xl'
											/>
										</div>
										<Button
											variant='blue'
											type='button'
											onClick={handleUploadAvatar}
											className='w-full bg-primary/5 hover:bg-theme-hover/80 text-foreground hover:text-background rounded-xl'
										>
											Загрузить
										</Button>
									</div>
								</div>
								<div className='w-full lg:w-1/2'>
									<ProfileAvatar
										className='w-24 h-24 border-none bg-secondary hover:bg-secondary mt-2 lg:mt-0'
										avatarImage={avatar?.url || ''}
										avatarSize={Number(92)}
									/>
								</div>
							</div>

							<div className='lg:flex w-full mt-6 gap-4'>
								<div className='w-full lg:w-1/2'>
									<p className='mt-2'>
										{/* {formatMessage({ id: 'profilePageEditGroup.extraFields' })} */}
										Шапка
									</p>
									<p className='text-sm text-gray-400 leading-3 mt-1'>
										{/* {formatMessage({ id: 'profilePageEditGroup.descriptionExtraFields' })} */}
										Шапка профиля пользователя
									</p>
									<div className='flex w-full justify-around mt-2 gap-4'>
										<div className='grid w-full max-w-sm items-center'>
											<Input
												id='banner'
												type='file'
												accept='image/*'
												ref={bannerInputRef}
												className='rounded-xl'
											/>
										</div>
										<Button
											variant='blue'
											type='button'
											onClick={handleUploadBanner}
											className='w-full bg-primary/5 hover:bg-theme-hover/80 text-foreground hover:text-background rounded-xl'
										>
											Загрузить
										</Button>
									</div>
								</div>
								<div className='w-full lg:w-1/2'>
									<ProfileAvatar
										className='w-24 h-24 border-none bg-secondary hover:bg-secondary mt-2 lg:mt-0'
										avatarImage={banner?.url || ''}
										avatarSize={Number(92)}
									/>
								</div>
							</div>

							<Button
								variant='blue'
								loading={form.formState.isSubmitting}
								className='mt-6 w-full bg-primary/5 hover:bg-theme-hover/80 text-foreground hover:text-background rounded-xl'
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
