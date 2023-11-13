import LiveCommentItem from './LiveCommentItem/LiveCommentItem'
import styles from './LiveComments.module.scss'

export default function LiveCommnets() {
	return (
		<>
			<div className={styles.LiveCommnets}>
				<div className={styles.LiveCommnetsFrame}>
					<div className={styles.Header}>
						<p>Сейчас обсуждают</p>
					</div>
					<LiveCommentItem />
					<LiveCommentItem />
					<LiveCommentItem />
					<LiveCommentItem />
					<LiveCommentItem />
					<LiveCommentItem />
				</div>
			</div>
		</>
	)
}
