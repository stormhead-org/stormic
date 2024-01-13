'use client'

import { BookmarkCheck } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import GitHubButton from 'react-github-btn'
import styles from './NavMenu.module.scss'
import ProjectAbout from './project_about/ProjectAbout'

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

export default function NavBar() {
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
					<br />
					<div className={styles.GitHubBtn}>
						{/* <GitHubButton
							href='https://github.com/nimscore'
							data-color-scheme='no-preference: dark; light: dark; dark: dark;'
							data-size='large'
							data-show-count='true'
							aria-label='Follow @nimscore on GitHub'
						>
							nimscore
						</GitHubButton> */}
						<GitHubButton
							href='https://github.com/nimscore/fatum-ui'
							data-color-scheme='no-preference: dark; light: dark; dark: dark;'
							data-icon='octicon-star'
							data-size='large'
							data-show-count='true'
							aria-label='Star nimscore/fatum-ui on GitHub'
						>
							Fatum
						</GitHubButton>
					</div>
				</div>
			</div>
		</>
	)
}
