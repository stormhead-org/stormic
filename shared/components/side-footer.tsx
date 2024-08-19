import Link from 'next/link'
import React from 'react'
import { cn } from '../lib/utils'

interface Props {
	className?: string
}

export const SideFooter: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('', className)}>
			<span className=''>
				stormic.app: <Link className='text-a-color hover:text-a-color-hover'
				                   href='/about'>О проекте</Link> |{' '}
				<Link className='text-a-color hover:text-a-color-hover' href='/rules'>Правила</Link> |{' '}
				<Link className='text-a-color hover:text-a-color-hover' href='/privacy_policy'>
					Политика конфиденциальности
				</Link>
				<br />
				<br />
				stormic: <Link className='text-a-color hover:text-a-color-hover'
				               href='https://stormic.app/about/'>О проекте</Link> |{' '}
				<Link className='text-a-color hover:text-a-color-hover'
				      href='https://stormic.app/rules/'>Сочетания клавиш</Link> |{' '}
				<Link className='text-a-color hover:text-a-color-hover' href='https://github.com/stormhead-org/stormic'>
					Исходный код
				</Link>{' '}
				| v0.0.1-alpha
				<br />
				<br />
				Сделано с любовью и{' '}
				<Link className='text-a-color hover:text-a-color-hover' href='https://github.com/vercel/next.js'>NextJS</Link>
				<br />
				Сообщество <Link className='text-a-color hover:text-a-color-hover' href='https://stormic.app/'>Stormic</Link> © 2023 -
				2024
			</span>
		</div>
	)
}
