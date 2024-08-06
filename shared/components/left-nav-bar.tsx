import { prisma } from '@/prisma/prisma-client'
import { cn } from '@/shared/lib/utils'
import { LinkIcon } from 'lucide-react'
import Link from 'next/link'

interface Props {
	className?: string
}

export default async function LeftNavBar() {
	const navMenu = await prisma.homeLeftSideMenu.findMany()
	// const router = useRouter()
	// const pathname = usePathname()
	// const handleClick = (link: string) => {
	// 	router.push(link)
	// }

	return (
		<>
			<div className='my-4'>
				<ul>
					{navMenu.map(obj => (
						<li
							key={obj.id}
							className={cn(
								'flex items-center justify-between w-full h-12 rounded-[6px] hover:bg-blue-600 mb-[1px] cursor-pointer'
								// `${pathname === obj.pageUrl ? 'bg-blue-600' : ''}`
							)}
							// onClick={() => {
							// 	handleClick(obj.pageUrl)
							// }}
						>
							<div className='flex items-center gap-2 ml-2'>
								<LinkIcon size={22} />
								<Link href={obj.pageUrl} className='text-lg font-bold'>
									{obj.name}
								</Link>
							</div>
						</li>
					))}
				</ul>
			</div>

			<div className=''>
				<span className=''>
					stormic.app: <Link href='https://stormic.app/about/'>О проекте</Link>{' '}
					| <Link href='https://stormic.app/rules/'>Правила</Link> |{' '}
					<Link href='https://stormic.app/privacy_policy/'>
						Политика конфиденциальности
					</Link>
					<br />
					<br />
					stormic: <Link href='https://stormic.app/about/'>
						О проекте
					</Link> |{' '}
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
		</>
	)
}
