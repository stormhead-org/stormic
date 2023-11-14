import styles from './TrendSwitch.module.scss'

export default function TrendSwitch() {
	return (
		<>
			<div className={styles.TrendSwitch}>
				<div className={styles.TrendFrame}>
					<button className={`${styles.Today} ${styles.SwitchButton}`}>
						День
					</button>
					<button className={`${styles.Week} ${styles.SwitchButton}`}>
						Неделя
					</button>
					<button className={`${styles.Month} ${styles.SwitchButton}`}>
						Месяц
					</button>
					<button className={`${styles.Year} ${styles.SwitchButton}`}>
						Год
					</button>
				</div>
			</div>
		</>
	)
}
