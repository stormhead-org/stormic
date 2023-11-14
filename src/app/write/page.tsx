import EditorJS from '@editorjs/editorjs'
import React from 'react'
import MainLayout from '../../components/ui/custom_layouts/main_layout/MainLayout'
import styles from './page.module.scss'

export default function WritePage() {
	React.useEffect(() => {
		const editor = new EditorJS({
			holder: 'editor'
		})
	}, [])

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
							<div id='editor' />
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
