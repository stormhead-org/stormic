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
				stormic.app: <Link href='https://stormic.app/about/'>О проекте</Link> |{' '}
				<Link href='https://stormic.app/rules/'>Правила</Link> |{' '}
				<Link href='https://stormic.app/privacy_policy/'>
					Политика конфиденциальности
				</Link>
				<br />
				<br />
				stormic: <Link href='https://stormic.app/about/'>О проекте</Link> |{' '}
				<Link href='https://stormic.app/rules/'>Сочетания клавиш</Link> |{' '}
				<Link href='https://github.com/stormhead-org/Stormic'>
					Исходный код
				</Link>{' '}
				| v0.0.1-alpha
				<br />
				<br />
				Сделано с любовью и{' '}
				<Link href='https://github.com/vercel/next.js'>NextJS</Link>
				<br />
				Сообщество <Link href='https://stormic.app/'>Stormic</Link> © 2023 -
				2024
			</span>
		</div>
	)
}
