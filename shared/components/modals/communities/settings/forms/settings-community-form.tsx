import { Community, Media } from '@/payload-types'
import { Title } from '@/shared/components'
import { FormInput } from '@/shared/components/form/'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/shared/components/ui/tabs'
import { Textarea } from '@/shared/components/ui/textarea'
import { settingsCommunity } from '@/shared/utils/api/communities/settingsCommunity'
import { createMedia } from '@/shared/utils/api/media/createMedia'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
	formSettingsCommunitySchema,
	TFormSettingsCommunityValues
} from './schemas'

interface Props {
	community: Community
	onClose?: VoidFunction
}

export const SettingsCommunityForm: React.FC<Props> = ({
	community,
	onClose
}) => {
	const form = useForm<TFormSettingsCommunityValues>({
		resolver: zodResolver(formSettingsCommunitySchema),
		defaultValues: {
			title: community.title || '',
			description: community.communityDescription || '',
			email: community.communityContactEmail || '',
			rules: community.rules
				? community.rules.map(rule => ({
						communityNameRule: rule.communityNameRule ?? '',
						communityDescriptionRule: rule.communityDescriptionRule ?? undefined
				  }))
				: [],
			tableCommunityInfo: community.tableCommunityInfo
				? community.tableCommunityInfo.map(info => ({
						label: info.label ?? '',
						value: info.value ?? ''
				  }))
				: []
		}
	})
	const router = useRouter()

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'rules'
	})

	const {
		fields: tableFields,
		append: appendTable,
		remove: removeTable
	} = useFieldArray({
		control: form.control,
		name: 'tableCommunityInfo'
	})

	const [logo, setLogo] = useState<Media | undefined>(
		community.communityLogo && typeof community.communityLogo === 'object'
			? (community.communityLogo as Media)
			: undefined
	)
	const [banner, setBanner] = useState<Media | undefined>(
		community.communityBanner && typeof community.communityBanner === 'object'
			? (community.communityBanner as Media)
			: undefined
	)

	const logoInputRef = useRef<HTMLInputElement>(null)
	const bannerInputRef = useRef<HTMLInputElement>(null)

	const handleUploadAvatar = async () => {
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
			const filteredRules = data.rules
				? data.rules
						.filter(
							rule =>
								rule.communityNameRule && rule.communityNameRule.trim() !== ''
						)
						.map(rule => ({
							communityNameRule: rule.communityNameRule,
							communityDescriptionRule:
								rule.communityDescriptionRule ?? undefined
						}))
				: []

			const filteredTableInfo = data.tableCommunityInfo
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
				rules: filteredRules,
				tableCommunityInfo: filteredTableInfo?.length ? filteredTableInfo : []
			})
			toast.success('Сообщество обновлено', { icon: '✅' })
			onClose?.()
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
				<div className='flex justify-between items-center'>
					<div className='mr-2'>
						<Title
							text='Настройки сообщества'
							size='md'
							className='font-bold'
						/>
						<p className='text-gray-400'>
							Настройте и стилизуйте сообщество так, как хочется вам и вашему
							сообществу
						</p>
					</div>
				</div>

				<Tabs defaultValue='main' className='w-[400px]'>
					<TabsList>
						<TabsTrigger value='main'>Основное</TabsTrigger>
						<TabsTrigger value='appearance'>Внешний вид</TabsTrigger>
						<TabsTrigger value='rules'>Правила</TabsTrigger>
						<TabsTrigger value='additional'>Дополнительно</TabsTrigger>
					</TabsList>
					<TabsContent
						className='h-[18rem] overflow-auto no-scrollbar'
						value='main'
					>
						<FormInput
							name='title'
							label='Название сообщества'
							type='text'
							placeholder='Stormic'
						/>

						<FormInput
							name='description'
							label='Описание сообщества'
							type='textarea'
							placeholder='код, GitHub и ты'
							className='mt-2'
						/>

						<FormInput
							name='email'
							label='E-mail для связи'
							type='text'
							placeholder='stormic@stormhead.org'
							className='mt-2'
						/>
					</TabsContent>

					<TabsContent
						className='h-[18rem] overflow-auto no-scrollbar'
						value='appearance'
					>
						<div className='flex w-full max-w-sm items-end space-x-2 mt-2'>
							<Avatar>
								<AvatarImage src={logo?.url || ''} />
								<AvatarFallback>SH</AvatarFallback>
							</Avatar>
							<div className='grid w-full max-w-sm items-center gap-1.5'>
								<Label htmlFor='logo'>Логотип</Label>
								<Input
									id='logo'
									type='file'
									accept='image/*'
									ref={logoInputRef}
								/>
							</div>
							<Button variant='blue' type='button' onClick={handleUploadAvatar}>
								Загрузить
							</Button>
						</div>

						<div className='flex w-full max-w-sm items-end space-x-2 mt-2'>
							<Avatar>
								<AvatarImage src={banner?.url || ''} />
								<AvatarFallback>SH</AvatarFallback>
							</Avatar>
							<div className='grid w-full max-w-sm items-center gap-1.5'>
								<Label htmlFor='banner'>Баннер</Label>
								<Input
									id='banner'
									type='file'
									accept='image/*'
									ref={bannerInputRef}
								/>
							</div>
							<Button variant='blue' type='button' onClick={handleUploadBanner}>
								Загрузить
							</Button>
						</div>
					</TabsContent>

					<TabsContent
						className='h-[18rem] overflow-auto no-scrollbar'
						value='rules'
					>
						{/* Правила */}
						<div className='space-y-4'>
							<Title
								text='Правила сообщества'
								size='sm'
								className='font-bold'
							/>
							{fields.map((field, index) => (
								<div key={field.id} className='space-y-2 border p-4 rounded-md'>
									<div>
										<Label htmlFor={`rules.${index}.communityNameRule`}>
											Название правила
										</Label>
										<Input
											id={`rules.${index}.communityNameRule`}
											{...form.register(`rules.${index}.communityNameRule`, {
												required: 'Название правила обязательно'
											})}
											placeholder='Например, "Будьте вежливы"'
										/>
										{form.formState.errors.rules?.[index]
											?.communityNameRule && (
											<p className='text-red-500 text-sm'>
												{
													form.formState.errors.rules[index].communityNameRule
														.message
												}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor={`rules.${index}.communityDescriptionRule`}>
											Описание правила
										</Label>
										<Textarea
											id={`rules.${index}.communityDescriptionRule`}
											{...form.register(
												`rules.${index}.communityDescriptionRule`
											)}
											placeholder='Опишите правило подробно'
										/>
									</div>
									<Button
										variant='destructive'
										type='button'
										onClick={() => remove(index)}
									>
										Удалить правило
									</Button>
								</div>
							))}
							<Button
								variant='blue'
								type='button'
								onClick={() =>
									append({
										communityNameRule: '',
										communityDescriptionRule: ''
									})
								}
							>
								Добавить правило
							</Button>
						</div>
					</TabsContent>

					<TabsContent
						className='h-[18rem] overflow-auto no-scrollbar'
						value='additional'
					>
						{/* Таблица деталей */}
						<div className='space-y-4'>
							<Title text='Таблица деталей' size='sm' className='font-bold' />
							{tableFields.map((field, index) => (
								<div key={field.id} className='space-y-2 border p-4 rounded-md'>
									<div>
										<Label htmlFor={`tableCommunityInfo.${index}.label`}>
											Название
										</Label>
										<Input
											id={`tableCommunityInfo.${index}.label`}
											{...form.register(`tableCommunityInfo.${index}.label`, {
												required: 'Название обязательно'
											})}
											placeholder='Например, "Мой сайт"'
										/>
										{form.formState.errors.tableCommunityInfo?.[index]
											?.label && (
											<p className='text-red-500 text-sm'>
												{
													form.formState.errors.tableCommunityInfo[index].label
														.message
												}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor={`tableCommunityInfo.${index}.value`}>
											Значение
										</Label>
										<Input
											id={`tableCommunityInfo.${index}.value`}
											{...form.register(`tableCommunityInfo.${index}.value`, {
												required: 'Значение обязательно'
											})}
											placeholder='Например, "google.com"'
										/>
										{form.formState.errors.tableCommunityInfo?.[index]
											?.value && (
											<p className='text-red-500 text-sm'>
												{
													form.formState.errors.tableCommunityInfo[index].value
														.message
												}
											</p>
										)}
									</div>
									<Button
										variant='destructive'
										type='button'
										onClick={() => removeTable(index)}
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
								>
									Добавить деталь
								</Button>
							)}
						</div>
					</TabsContent>

					{/* <TabsContent value="main">
	
	</TabsContent> */}
				</Tabs>
				<Button
					variant='blue'
					loading={form.formState.isSubmitting}
					className='flex items-center gap-2 text-sm font-bold'
					type='submit'
				>
					Сохранить
				</Button>
			</form>
		</FormProvider>
	)
}
