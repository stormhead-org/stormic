import { Bell } from 'fluent-emoji'
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
					<Bell width={24} />
					<span className={styles.notifications_number}>8</span>
				</a>
			</div>
		</>
	)
}
