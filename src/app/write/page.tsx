import { NextPage } from 'next'
import MainLayout from '../../../components/ui/CustomLayouts/MainLayout/MainLayout'
import styles from './page.module.scss'

const WritePage: NextPage = () => {
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

export default WritePage
