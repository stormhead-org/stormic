'use client'

import { User } from '@/payload-types'
import { Container, Title } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
// import { LocaleToggle } from '@/shared/components/ui/locale-toggle'
import { ModeSelector } from '@/shared/components/ui/mode-selector'
import React from 'react'
// import { useIntl } from 'react-intl'

interface Props {
	data: User
}

export const SettingsProfilePreferencesPageGroup: React.FC<Props> = ({
	data
}) => {
	// const { formatMessage } = useIntl()

	return (
		<Container className='bg-secondary rounded-md mt-1 p-4'>
			<div className='w-full border-b-2 border-b-blue-600 pb-4'>
				<Title
					// text={formatMessage({
					// 	id: 'profilePagePreferencesGroup.titleBaseInfo'
					// })}
					text='Внешний вид'
					size='sm'
					className='mt-2'
				/>
			</div>

			<div className='mt-4'>
				<div className='flex items-center gap-4 w-full'>
					<div className='w-full mt-2'>
						<p>
							{/* {formatMessage({ id: 'profilePagePreferencesGroup.titleLocale' })} */}
							Язык интерфейса
						</p>
						<p className='text-sm text-gray-400 leading-3 mt-2'>
							{/* {formatMessage({
								id: 'profilePagePreferencesGroup.descriptionLocale'
							})} */}
							Выберите предпочтительный для вас язык
						</p>
						{/* <LocaleToggle className='mt-3 h-12 w-full bg-primary/5 rounded-md' /> */}
					</div>
					<div className='w-full mt-2'>
						<p>
							{/* {formatMessage({ id: 'profilePagePreferencesGroup.titleTheme' })} */}
							Тема сайта
						</p>
						<p className='text-sm text-gray-400 leading-3 mt-2'>
							{/* {formatMessage({
								id: 'profilePagePreferencesGroup.descriptionTheme'
							})} */}
							Выберите предпочтительную для вас тему
						</p>
						<ModeSelector className='mt-3 h-12 w-full bg-primary/5 rounded-md' />
					</div>
				</div>
			</div>

			<Button
				disabled={true}
				className='text-base mt-6 w-full'
				variant='blue'
				type='submit'
			>
				{/* {formatMessage({ id: 'profilePagePreferencesGroup.saveButton' })} */}
				Сохранить
			</Button>
		</Container>
	)
}
