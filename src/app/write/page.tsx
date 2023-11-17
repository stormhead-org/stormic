import dynamic from 'next/dynamic'
import MainLayout from '../../components/ui/custom_layouts/main_layout/MainLayout'
import styles from './page.module.scss'

const EditorJS = dynamic(
	() => import('../../components/pages/write/editor/Editor'),
	{ ssr: false }
)

// const WritePage: React.FC<WriteFormPropsHeader> = ({ title }) => {
// 	return (
// 		<>
// 			<MainLayout
// 				className='WriteLayoutSettings'
// 				hideLeftSideBar
// 				hideRightSideBar
// 			>
// 				<div className={styles.WritePage}>
// 					<div className={styles.WritePageFrame}>
// 						<div className={styles.TopRow}>
// 							<input
// 								className={styles.NewPostName}
// 								placeholder='Заголовок'
// 								defaultValue={title}
// 							/>
// 							<div className={styles.Editor}>{<Editor />}</div>

// 						</div>
// 					</div>
// 				</div>
// 			</MainLayout>
// 		</>
// 	)
// }

export default function WritePage() {
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
							<input className={styles.NewPostName} placeholder='Заголовок' />
							<EditorJS />
						</div>
					</div>
				</div>
			</MainLayout>
		</>
	)
}
