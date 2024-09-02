'use client'

import { Container, Title } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { LocaleToggle } from '@/shared/components/ui/locale-toggle'
import { ModeSelector } from '@/shared/components/ui/mode-selector'
import { User } from '@prisma/client'
import React from 'react'
import { useIntl } from 'react-intl'

interface Props {
	data: User;
}

export const SettingsProfilePreferencesPageGroup: React.FC<Props> = ({ data }) => {
	const { formatMessage } = useIntl()
	
	return (
		<Container className='bg-secondary rounded-md mt-1 p-4'>
			<div className='w-full border-b-2 border-b-blue-600 pb-4'>
				<Title
					text={formatMessage({ id: 'profilePagePreferencesGroup.titleBaseInfo' })}
					size='sm'
					className='mt-2'
				/>
			</div>
			
			<div className='mt-4'>
				<div className='flex items-center gap-4 w-full'>
					<div className='w-full mt-2'>
						<p>{formatMessage({ id: 'profilePagePreferencesGroup.titleLocale' })}</p>
						<p className='text-sm text-gray-400 leading-3 mt-2'>
							{formatMessage({ id: 'profilePagePreferencesGroup.descriptionLocale' })}
						</p>
						<LocaleToggle className='mt-3 h-12 w-full bg-primary/5 rounded-md' />
					</div>
					<div className='w-full mt-2'>
						<p>{formatMessage({ id: 'profilePagePreferencesGroup.titleTheme' })}</p>
						<p className='text-sm text-gray-400 leading-3 mt-2'>
							{formatMessage({ id: 'profilePagePreferencesGroup.descriptionTheme' })}
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
				{formatMessage({ id: 'profilePagePreferencesGroup.saveButton' })}
			</Button>
		</Container>
	)
}
