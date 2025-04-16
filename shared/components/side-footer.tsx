'use client'

import packageJson from '@/package.json'
import Link from 'next/link'
import React from 'react'
// import { useIntl } from 'react-intl'
import { cn } from '../lib/utils'

interface Props {
	className?: string
}

export const SideFooter: React.FC<Props> = ({ className }) => {
	const version = packageJson.version
	// const { formatMessage } = useIntl()
	return (
		<div className={cn('', className)}>
			<span className=''>
				{process.env.NEXT_PUBLIC_BASE_URL}:{' '}
				<Link
					// href='/about'>{formatMessage({ id: 'sideFooter.about' })}</Link> |{' '}
					href='/about'
				>
					О Проекте
				</Link>{' '}
				|{' '}
				<Link
					// href='/rules'>{formatMessage({ id: 'sideFooter.rules' })}</Link> |{' '}
					href='/about'
				>
					Правила
				</Link>
				<br />
				<br />
				stormic:{' '}
				<Link
					// href='https://stormic.app/about/'>{formatMessage({ id: 'sideFooter.about' })}</Link> |{' '}
					target='_blank'
					href='https://stormic.app/about/'
				>
					О Проекте
				</Link>{' '}
				|{' '}
				<Link target='_blank' href='https://github.com/stormhead-org/stormic'>
					{/* {formatMessage({ id: 'sideFooter.sourceCode' })} */}
					Исходный код
				</Link>{' '}
				| v{version}
				<br />
				<br />
				{/* {formatMessage({ id: 'sideFooter.madeWithLove' })}{' '} */}
				Сделано с любовью и{' '}
				<Link target='_blank' href='https://github.com/vercel/next.js'>
					NextJS
				</Link>
				<br />
				{/* {formatMessage({ id: 'sideFooter.community' })} */}
				Сообщество{' '}
				<Link target='_blank' href='https://stormic.app/'>
					Stormic
				</Link>{' '}
				{/* {formatMessage({ id: "sideFooter.communityDate" })} */}© 2025
			</span>
		</div>
	)
}
