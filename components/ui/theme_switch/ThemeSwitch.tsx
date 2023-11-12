import { WaxingCrescentMoon } from 'fluent-emoji'
import Link from 'next/link'
import styles from './ThemeSwitch.module.scss'

export default function ThemeSwitch() {
	return (
		<>
			<div className={styles.ItemHeaderMenu}>
				<Link className={styles.ThemeSwitch} href='/#' aria-label='Темная тема'>
					<WaxingCrescentMoon width={24} />
				</Link>
			</div>
		</>
	)
}
