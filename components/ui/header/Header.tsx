import Image from 'next/image'
import Link from 'next/link'
import Avatar from '../avatar/Avatar'
import NotificationsBell from '../notifications_bell/NotificationsBell'
import ThemeSwitch from '../theme_switch/ThemeSwitch'
import styles from './Header.module.scss'

export default function Header() {
	return (
		<>
			<div className={styles.Header}>
				<div className={styles.HeaderContainer}>
					<div className={styles.Left}>
						<Link href='/' aria-label='Главная'>
							<Image
								className={styles.Logo}
								src='../../../icons/fire.svg'
								priority
								alt='Лого'
								width={50}
								height={50}
							/>
						</Link>
					</div>

					<div className={styles.Center}>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/wiki' aria-label='Руководства'>
								<Image
									src='../../../icons/page.svg'
									alt='Руководства'
									height={24}
									width={24}
								/>
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/groups' aria-label='Сообщества'>
								<Image
									src='../../../icons/rocket.svg'
									alt='Сообщества'
									height={24}
									width={24}
								/>
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/users' aria-label='Участники'>
								<Image
									src='../../../icons/peace.svg'
									alt='Участники'
									height={24}
									width={24}
								/>
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/community' aria-label='Общение'>
								<Image
									src='../../../icons/megaphone.svg'
									alt='общение'
									height={24}
									width={24}
								/>
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/about' aria-label='О Нас'>
								<Image
									src='../../../icons/bulb.svg'
									alt='О Нас'
									height={24}
									width={24}
								/>
							</Link>
						</div>
					</div>

					<div className={styles.Right}>
						<ThemeSwitch />
						<NotificationsBell />
						<Avatar />
					</div>
				</div>
			</div>
		</>
	)
}
