import data from '../../../../data.js'
import styles from './Post.module.scss'
import PostItem from './post_item/PostItem'

const Posts = () => {
	const Publications = data
	return (
		<>
			<div className={styles.Post}>
				<div className={styles.PostFrame}>
					<div>
						{Publications.publications.new.map(obj => (
							<PostItem key={obj.id} {...obj} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Posts
