'use client'

import { BookmarkCheck } from 'lucide-react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './NavMenu.module.scss'
import ProjectAbout from './project_about/ProjectAbout'

type Repo = {
	name: string
	stargazers_count: number
}

const LeftSideCustomMenu = [
	{
		text: 'Self-Host',
		icon: <BookmarkCheck size={24} />,
		path: '/placeholder_1'
	},
	{
		text: 'Fatum Admin Doc',
		icon: <BookmarkCheck size={24} />,
		path: '/placeholder_2'
	},
	{
		text: 'Контакты',
		icon: <BookmarkCheck size={24} />,
		path: '/placeholder_3'
	},
	{ text: 'FAQ', icon: <BookmarkCheck size={24} />, path: '/placeholder_4' }
]

export const getStaticProps = (async context => {
	const res = await fetch('https://api.github.com/repos/nimscore/fatum-ui')
	const repo = await res.json()
	return { props: { repo } }
}) satisfies GetStaticProps<{
	repo: Repo
}>

export default function NavBar({
	repo
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter()
	const pathname = usePathname()

	const handleClick = (link: string) => {
		router.push(link)
	}

	return (
		<>
			<div className={styles.NavBar}>
				<div className={styles.MenuBlock}>
					<ul>
						{LeftSideCustomMenu.map(obj => (
							<li
								key={obj.path}
								className={`${styles.MenuBlockItem} ${
									pathname === obj.path ? `${styles.activeItemMenu}` : ''
								}`}
								onClick={() => {
									handleClick(obj.path)
								}}
							>
								<div className={styles.IconItemMenu}>{obj.icon}</div>
								<Link href={obj.path}>{obj.text}</Link>
							</li>
						))}
					</ul>
				</div>
				<div className={styles.AboutContainer}>
					<ProjectAbout />
					{/* <p>{repo.stargazers_count}</p> */}
				</div>
			</div>
		</>
	)
}
