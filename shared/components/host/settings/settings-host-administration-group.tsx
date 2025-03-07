'use client'

import { Community, type HostSetting } from '@/payload-types'
import { Container, Title } from '@/shared/components'
import {
	formSettingsHostSchema, formSettingsRulesHostSchema,
	type TFormSettingsHostValues,
	type TFormSettingsRulesHostValues
} from '@/shared/components/host/settings/form/schemas'
import {
	formSettingsRulesCommunitySchema,
	TFormSettingsRulesCommunityValues
} from '@/shared/components/modals/communities/settings/forms/schemas'
import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
// import { LocaleToggle } from '@/shared/components/ui/locale-toggle'
import { Textarea } from '@/shared/components/ui/textarea'
import { settingsCommunity } from '@/shared/utils/api/communities/settingsCommunity'
import { settingsHost } from '@/shared/utils/api/host/settingsHost'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
// import { useIntl } from 'react-intl'

interface Props {
	ownerId: number
	host: HostSetting
}

export const SettingsHostAdministrationGroup: React.FC<Props> = ({
	                                                                 ownerId, host
}) => {
	// const { formatMessage } = useIntl()
	const form = useForm<TFormSettingsRulesHostValues>({
		resolver: zodResolver(formSettingsRulesHostSchema),
		defaultValues: {
			rules: host.rules
				? host.rules.map(rule => ({
					nameRule: rule.nameRule ?? '',
					descriptionRule: rule.descriptionRule ?? undefined
				  }))
				: []
		}
	})
	const router = useRouter()

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'rules'
	})

	const onSubmit = async (data: TFormSettingsRulesHostValues) => {
		try {
			const filteredRules = data.rules
				? data.rules
						.filter(
							rule =>
								rule.nameRule && rule.nameRule.trim() !== ''
						)
						.map(rule => ({
							nameRule: rule.nameRule,
							descriptionRule:
								rule.descriptionRule ?? undefined
						}))
				: []

			await settingsHost({
				ownerId: ownerId,
				rules: filteredRules
			})
			toast.success('Сервер обновлено', { icon: '✅' })
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
						Хотя большинство утверждает, что прочитали и согласны с правилами,
						обычно люди не читают их до тех пор, пока не возникнет проблема.
						Упростите просмотр правил вашей платформы с первого взгляда,
						предоставив их в виде простого маркированного списка. Старайтесь,
						чтобы отдельные правила были краткими и простыми, но старайтесь не
						разбивать их на множество отдельных элементов.
					</p>
					<div className='w-full border-b-2 border-b-blue-600 pb-4'>
						<Title
							// text={formatMessage({
							// 	id: 'profilePagePreferencesGroup.titleBaseInfo'
							// })}
							text='Правила сервера'
							size='sm'
							className='mt-2'
						/>
					</div>

					<div className='mt-4'>
						{/* Правила */}
						<div className='space-y-4'>
							{fields.map((field, index) => (
								<div key={field.id} className='space-y-2 border p-4 rounded-md'>
									<div>
										<Label htmlFor={`rules.${index}.nameRule`}>
											Правило
										</Label>
										<p className='text-sm text-gray-400 leading-3 mt-1'>
											{/* {formatMessage({ id: 'profilePageEditGroup.descriptionName' })} */}
											Опишите правило или требование для пользователей в этом
											сообществе. Постарайтесь сделать его коротким и простым
										</p>
										<Textarea
											id={`rules.${index}.nameRule`}
											{...form.register(`rules.${index}.nameRule`, {
												required: 'Название правила обязательно'
											})}
											placeholder='Запрещено продвижение антинаучных точек зрения'
											className='mt-2'
										/>
										{form.formState.errors.rules?.[index]
											?.nameRule && (
											<p className='text-red-500 text-sm'>
												{
													form.formState.errors.rules[index].nameRule
														.message
												}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor={`rules.${index}.descriptionRule`}>
											Больше информации
										</Label>
										<p className='text-sm text-gray-400 leading-3 mt-1'>
											{/* {formatMessage({ id: 'profilePageEditGroup.descriptionName' })} */}
											Необязательно. Предоставьте дополнительные сведения о
											правиле
										</p>
										<Textarea
											id={`rules.${index}.descriptionRule`}
											{...form.register(
												`rules.${index}.descriptionRule`
											)}
											placeholder='Поддержка гомеопатии, лечения молитвами, отрицание COVID-19 или отрицание того, что вакцины от него намного больше защищают, чем угрожают жизням'
											className='mt-2'
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
										nameRule: '',
										descriptionRule: ''
									})
								}
							>
								Добавить правило
							</Button>
						</div>
					</div>

					<Button
						variant='blue'
						loading={form.formState.isSubmitting}
						className='text-base mt-6 w-full'
						type='submit'
					>
						{/* {formatMessage({ id: 'profilePagePreferencesGroup.saveButton' })} */}
						Сохранить
					</Button>
				</Container>
			</form>
		</FormProvider>
	)
}
