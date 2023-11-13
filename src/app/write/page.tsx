import MainLayout from '../../../components/ui/MainLayout/MainLayout'
import styles from './page.module.scss'

export default function write() {
	return (
		<>
			<MainLayout>
				<div className={styles.WritePage}>
					<div className={styles.WritePageFrame}>
						<div className={styles.TopRow}>
							<div className={styles.NewPostName}>
								<input placeholder='Заголовок' />
							</div>
						</div>
						<div className={styles.BotRow}></div>
					</div>
				</div>
			</MainLayout>
		</>
	)
}
