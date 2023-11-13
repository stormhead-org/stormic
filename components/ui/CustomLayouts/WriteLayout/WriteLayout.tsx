import Header from '../../header/Header'
import styles from './WriteLayout.module.scss'

export default function WriteLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header />
			<div className={styles.WriteLayout}>
				<div className={styles.WriteLayoutFrame}>
					<div className={styles.LeftSide}></div>

					<div className={styles.CenterBlock}>{children}</div>

					<div className={styles.RightSide}></div>
				</div>
			</div>
		</>
	)
}
