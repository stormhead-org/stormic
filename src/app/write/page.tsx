import MainLayout from '../../components/ui/custom_layouts/main_layout/MainLayout'
import styles from './page.module.scss'

export default function WritePage() {
	return (
		<>
			<MainLayout hideLeftSideBar hideRightSideBar>
				<div className={styles.WritePage}>
					<div className={styles.WritePageFrame}>
						<div className={styles.TopRow}>
							<div className={styles.NewPostName}>
								<input placeholder='Заголовок' />
							</div>
						</div>
						<div className={styles.BotRow}>
							<div className={styles.NewPostBody}></div>
						</div>
					</div>
				</div>
			</MainLayout>
		</>
	)
}
