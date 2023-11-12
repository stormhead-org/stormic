import {
	LightBulb,
	Megaphone,
	PageFacingUp,
	Rocket,
	VictoryHand
} from 'fluent-emoji'
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
								src='../../logo/logo.svg'
								priority
								alt='logo'
								width={40}
								height={50}
							/>
						</Link>
					</div>

					<div className={styles.Center}>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/wiki' aria-label='Руководства'>
								<PageFacingUp width={24} />
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/groups' aria-label='Сообщества'>
								<Rocket width={24} />
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/users' aria-label='Участники'>
								<VictoryHand width={24} />
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/community' aria-label='Общение'>
								<Megaphone width={24} />
							</Link>
						</div>
						<div className={styles.ItemHeaderMenu}>
							<Link href='/about' aria-label='О Нас'>
								<LightBulb width={24} />
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
