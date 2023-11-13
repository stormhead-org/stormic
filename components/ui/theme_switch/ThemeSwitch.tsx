import Image from 'next/image'
import Link from 'next/link'
import styles from './ThemeSwitch.module.scss'

export default function ThemeSwitch() {
	return (
		<>
			<div className={styles.ItemHeaderMenu}>
				<Link className={styles.ThemeSwitch} href='/#' aria-label='Темная тема'>
					<Image
						src='../../../icons/darktheme.svg'
						alt='Тёмная тема'
						height={24}
						width={24}
					/>
				</Link>
			</div>
		</>
	)
}
