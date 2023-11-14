import styles from './Banner.module.scss'

export default function Banner() {
	return (
		<>
			<div className={styles.Banner}>
				<div className={styles.BannerFrame}>
					<h1>Mustel</h1>
				</div>
				<div className={styles.Search}>
					<div className={styles.SearchFrame}>
						{/* <div className={styles.Icon}>
							<ScanSearch />
						</div> */}
						<input
							className={styles.Input}
							type='text'
							placeholder='Поиск...'
						></input>
					</div>
				</div>
			</div>
		</>
	)
}
