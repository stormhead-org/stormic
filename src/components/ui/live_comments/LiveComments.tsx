import data from '../../../../data.js'
import styles from './LiveComments.module.scss'
import LiveCommentItem from './live_comment_item/LiveCommentItem'

const LiveCommnets = () => {
	const Comments = data
	return (
		<>
			<div className={styles.LiveCommnets}>
				<div className={styles.LiveCommnetsFrame}>
					<div className={styles.Header}>
						<p>Сейчас обсуждают</p>
					</div>
					<div>
						{Comments.comments.popular.map(obj => (
							<LiveCommentItem key={obj.id} {...obj} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default LiveCommnets
