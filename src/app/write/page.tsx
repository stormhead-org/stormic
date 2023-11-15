'use client'

import EditorJS from '@editorjs/editorjs'
import React from 'react'
import MainLayout from '../../components/ui/custom_layouts/main_layout/MainLayout'
import styles from './page.module.scss'

// const Editor = dynamic(
// 	() => import('../../components/pages/write/editor/Editor'),
// 	{ ssr: false }
// )

interface WriteFormPropsHeader {
	title?: string
}

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

const WritePage: React.FC<WriteFormPropsHeader> = ({ title }) => {
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
							<input
								className={styles.NewPostName}
								placeholder='Заголовок'
								defaultValue={title}
							/>

							<div id='editor' />
						</div>
					</div>
				</div>
			</MainLayout>
		</>
	)
}

export default WritePage
