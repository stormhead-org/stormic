import dynamic from 'next/dynamic'
import MainLayout from '../../components/ui/custom_layouts/main_layout/MainLayout'
import styles from './page.module.scss'

const Editor = dynamic(
	() =>
		import('../../components/pages/write/editor/Editor').then(m => m.Editor),
	{ ssr: false }
)

interface WriteFormPropsHeader {
	title?: string
}

const WritePage: React.FC<WriteFormPropsHeader> = ({ title }) => {
	return (
		<>
			<MainLayout
				className='WriteLayoutSettings'
				hideLeftSideBar
				hideRightSideBar
			>
				<div className={styles.WritePage}>
					<div className={styles.WritePageFrame}>
						<div className={styles.TopRow}>
							<input
								className={styles.NewPostName}
								placeholder='Заголовок'
								defaultValue={title}
							/>
							<div className={styles.Editor}>{/* <Editor /> */}</div>
						</div>
						<div className={styles.BotRow}>
							<input
								className={styles.NewPostBody}
								placeholder='Нажмите Tab для выбора инструмента'
							/>
						</div>
					</div>
				</div>
			</MainLayout>
		</>
	)
}

export default WritePage
