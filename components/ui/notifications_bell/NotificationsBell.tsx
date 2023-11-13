import Image from 'next/image'
import styles from './NotificationsBell.module.scss'

export default function NotificationsBell() {
	return (
		<>
			<div className={styles.ItemHeaderMenu}>
				<a
					href='/notifications'
					className={styles.notifications_link}
					aria-label='Уведомления'
				>
					<Image
						src='../../../icons/bell.svg'
						alt='Уведомления'
						height={24}
						width={24}
					/>
					<span className={styles.notifications_number}>8</span>
				</a>
			</div>
		</>
	)
}
