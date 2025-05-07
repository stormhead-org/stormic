'use client'

import { Community } from '@/payload-types'
import { Container, Title } from '@/shared/components'
import {
	formSettingsRulesCommunitySchema,
	TFormSettingsRulesCommunityValues
} from '@/shared/components/profiles/settings/community/forms/schemas'
import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
// import { LocaleToggle } from '@/shared/components/ui/locale-toggle'
import { Textarea } from '@/shared/components/ui/textarea'
import { settingsCommunity } from '@/shared/utils/api/communities/settingsCommunity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
// import { useIntl } from 'react-intl'

interface Props {
	community: Community
}

export const SettingsCommunityAdministrationGroup: React.FC<Props> = ({
	community
}) => {
	// const { formatMessage } = useIntl()
	const form = useForm<TFormSettingsRulesCommunityValues>({
		resolver: zodResolver(formSettingsRulesCommunitySchema),
		defaultValues: {
			rules: community.rules
				? community.rules.map(rule => ({
						communityNameRule: rule.communityNameRule ?? '',
						communityDescriptionRule: rule.communityDescriptionRule ?? undefined
					}))
				: []
		}
	})
	const router = useRouter()

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'rules'
	})

	const onSubmit = async (data: TFormSettingsRulesCommunityValues) => {
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

			await settingsCommunity({
				communityId: community.id,
				rules: filteredRules
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
				<Container className='bg-secondary rounded-xl mt-1 p-4 text-foreground'>
					<p className='text-justify'>
						{/* {formatMessage({ id: 'profilePageEditGroup.tipForSocial' })} */}
						Хотя большинство утверждает, что прочитали и согласны с правилами,
						обычно люди не читают их до тех пор, пока не возникнет проблема.
						Упростите просмотр правил вашего сообщества с первого взгляда,
						предоставив их в виде простого маркированного списка. Старайтесь,
						чтобы отдельные правила были краткими и простыми, но старайтесь не
						разбивать их на множество отдельных элементов.
					</p>
					<div className='w-full border-b-2 border-b-theme pb-4'>
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
								<div key={field.id}>
									<div>
										<Label htmlFor={`rules.${index}.communityNameRule`}>
											Правило
										</Label>
										<p className='text-sm text-gray-400 leading-3 mt-1'>
											{/* {formatMessage({ id: 'profilePageEditGroup.descriptionName' })} */}
											Опишите правило или требование для пользователей в этом
											сообществе. Постарайтесь сделать его коротким и простым
										</p>
										<Textarea
											id={`rules.${index}.communityNameRule`}
											{...form.register(`rules.${index}.communityNameRule`, {
												required: 'Название правила обязательно'
											})}
											placeholder='Запрещено продвижение антинаучных точек зрения'
											className='mt-2'
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
											Больше информации
										</Label>
										<p className='text-sm text-gray-400 leading-3 mt-1'>
											{/* {formatMessage({ id: 'profilePageEditGroup.descriptionName' })} */}
											Необязательно. Предоставьте дополнительные сведения о
											правиле
										</p>
										<Textarea
											id={`rules.${index}.communityDescriptionRule`}
											{...form.register(
												`rules.${index}.communityDescriptionRule`
											)}
											placeholder='Поддержка гомеопатии, лечения молитвами, отрицание COVID-19 или отрицание того, что вакцины от него намного больше защищают, чем угрожают жизням'
											className='mt-2'
										/>
									</div>
									<Button
										variant='destructive'
										type='button'
										onClick={() => remove(index)}
										className='mt-2 rounded-xl text-foreground w-full'
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
								className='mt-4 bg-primary/5 hover:bg-theme-hover/80 text-foreground hover:text-background rounded-xl w-full'
							>
								Добавить правило
							</Button>
						</div>
					</div>

					<Button
						variant='blue'
						loading={form.formState.isSubmitting}
						className='mt-6 w-full bg-primary/5 hover:bg-theme-hover/80 text-foreground hover:text-background rounded-xl'
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
