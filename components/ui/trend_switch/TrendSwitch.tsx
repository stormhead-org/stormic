import globals from '../../../styles/Globals.module.scss'
import styles from './TrendSwitch.module.scss'

export default function TrendSwitch() {
	return (
		<>
			<div className={styles.TrendSwitch}>
				<div className={styles.TrendFrame}>
					<button className={`${styles.Today} ${globals.SwitchButton}`}>
						День
					</button>
					<button className={`${styles.Week} ${globals.SwitchButton}`}>
						Неделя
					</button>
					<button className={`${styles.Month} ${globals.SwitchButton}`}>
						Месяц
					</button>
					<button className={`${styles.Year} ${globals.SwitchButton}`}>
						Год
					</button>
				</div>
			</div>
		</>
	)
}
