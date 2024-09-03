'use client'

import packageJson from '@/package.json'
import Link from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'
import { cn } from '../lib/utils'

interface Props {
	className?: string
}

export const SideFooter: React.FC<Props> = ({ className }) => {
	const version = packageJson.version
	const { formatMessage } = useIntl()
	return (
		<div className={cn('', className)}>
			<span className=''>
				{process.env.NEXT_PUBLIC_DOMAIN}: <Link className='text-a-color hover:text-a-color-hover'
				                                        href='/about'>{formatMessage({ id: 'sideFooter.about' })}</Link> |{' '}
				<Link className='text-a-color hover:text-a-color-hover'
				      href='/rules'>{formatMessage({ id: 'sideFooter.rules' })}</Link> |{' '}
				<Link className='text-a-color hover:text-a-color-hover' href='/privacy_policy'>
					{formatMessage({ id: 'sideFooter.privacyPolicy' })}
				</Link>
				<br />
				<br />
				stormic: <Link className='text-a-color hover:text-a-color-hover'
				               href='https://stormic.app/about/'>{formatMessage({ id: 'sideFooter.about' })}</Link> |{' '}
				<Link className='text-a-color hover:text-a-color-hover'
				      href='https://stormic.app/rules/'>{formatMessage({ id: 'sideFooter.keyBinds' })}</Link> |{' '}
				<Link className='text-a-color hover:text-a-color-hover' href='https://github.com/stormhead-org/stormic'>
					{formatMessage({ id: 'sideFooter.sourceCode' })}
				</Link>{' '}
				| {version}
				<br />
				<br />
				{formatMessage({ id: 'sideFooter.madeWithLove' })}{' '}
				<Link className='text-a-color hover:text-a-color-hover' href='https://github.com/vercel/next.js'>NextJS</Link>
				<br />
				{formatMessage({ id: 'sideFooter.community' })} <Link className='text-a-color hover:text-a-color-hover'
				                                                      href='https://stormic.app/'>Stormic</Link> {formatMessage({ id: 'sideFooter.communityDate' })}
			</span>
		</div>
	)
}
