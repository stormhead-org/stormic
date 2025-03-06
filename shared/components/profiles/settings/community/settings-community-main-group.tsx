'use client'

import { type Community, User } from '@/payload-types'
import { Container, Title } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import React from 'react'

interface Props {
	data: Community
}

export const SettingsCommunityMainGroup: React.FC<Props> = ({ data }) => {
	// const { formatMessage } = useIntl()
	// const { main, loading, updateCustomField } = useProfileCustomFields(data.id)
	// const form = useProfileCustomFieldsForm(data, main) // Передаем оба аргумента

	// const { setValue, handleSubmit, formState } = form

	// useEffect(() => {
	// 	if (main) {
	// 		setValue('fullName', main.fullName)
	// 		setValue('bio', main.bio ?? '')
	// 		setValue('customFields', main.customFields)
	// 	}
	// }, [main, setValue])

	// const onSubmit = async (formData: TFormProfileUpdateValues) => {
	// 	if (!main) return

	// 	try {
	// 		await updateUserInfo({
	// 			where: { id: main.id },
	// 			data: {
	// 				fullName: formData.fullName,
	// 				bio: formData.bio,
	// 				customFields: formData.customFields // Используем значения из формы
	// 			}
	// 		})

	// 		toast.success(String(formatMessage({ id: 'profilePageAuthGroup.toastSuccess' })), {
	// 			icon: '✅'
	// 		})
	// 	} catch (error) {
	// 		toast.error(String(formatMessage({ id: 'profilePageAuthGroup.toastError' })), {
	// 			icon: '❌'
	// 		})
	// 	}
	// }

	return (
		<Container className='bg-secondary rounded-md mt-1 p-4'>
			<p>
				{/* {formatMessage({ id: 'profilePageEditGroup.tipForSocial' })} */}
				Настройте то, что люди видят в вашем профиле. Другие люди с большей
				вероятностью подпишутся на Вас и будут взаимодействовать с вами, если у
				Вас заполнен профиль и добавлено изображение.
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
								Отображаемое имя
							</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								{/* {formatMessage({ id: 'profilePageEditGroup.descriptionName' })} */}
								Ваше полное имя или псевдоним
							</p>
							{/* <FormInput name='fullName' className='mt-2' /> */}
							<p className='mt-4'>
								{/* {formatMessage({ id: 'profilePageEditGroup.titleAbout' })} */}
								О себе
							</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								{/* {formatMessage({ id: 'profilePageEditGroup.descriptionAbout' })} */}
								Расскажите миру немного о себе
							</p>
							{/* <FormTextarea
								name='bio'
								// placeholder={formatMessage({ id: 'profilePageEditGroup.formInputAboutPlaceholder' })}
								placeholder='Я бы много вам о себе рассказал, просто не хочу...'
								className='mt-2'
								sideButton={false}
							/> */}
						</div>
						<div className='w-1/2'>
							<p className='mt-2'>
								{/* {formatMessage({ id: 'profilePageEditGroup.extraFields' })} */}
								Таблица деталей
							</p>
							<p className='text-sm text-gray-400 leading-3 mt-1'>
								{/* {formatMessage({ id: 'profilePageEditGroup.descriptionExtraFields' })} */}
								Ваша домашняя страница, возраст - все, что угодно
							</p>
							{/* <SettingsPageProfileCustomFieldsItem
								userId={data.id}
								main={main}
								onCustomFieldChange={updateCustomField}
								loading={loading}
							/> */}
						</div>
					</div>
					<Button
						// disabled={formState.isSubmitting}
						className='text-base mt-6 w-full'
						variant='blue'
						type='submit'
					>
						{/* {formatMessage({ id: 'profilePageEditGroup.saveButton' })} */}
						Сохранить
					</Button>
				</div>
			</div>
		</Container>
	)
}
