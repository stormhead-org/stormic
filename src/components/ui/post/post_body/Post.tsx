import { GripHorizontal } from 'lucide-react'
import Link from 'next/link'
import Avatar from '../../avatar/Avatar'
import PostDownMenu from '../post_down_menu/PostDownMenu'
import styles from './Post.module.scss'

export default function Post() {
	return (
		<>
			<div className={styles.Post}>
				<div className={styles.PostFrame}>
					<div className={styles.PostTopBar}>
						<div className={styles.LeftSideBar}>
							<Avatar />
						</div>
						<div className={styles.CenterBar}>
							<Link className={styles.PostAuthorLink} href='/#'>
								Nims
							</Link>

							<p className={styles.PostTimeCreate}>Вчера</p>
						</div>
						<div className={styles.RightSideBar}>
							<button className={styles.Subscribe}>Подписаться</button>
							<button className={styles.Other}>
								<GripHorizontal />
							</button>
						</div>
					</div>
					<div className={styles.PostBody}>
						<Link className={styles.PostContent} href='/#'>
							<h3 className={styles.PostName}>
								Сколько научных открытий было сделано во время съемок
								Интерстеллара
							</h3>
							<p className={styles.PostTxtPreview}>
								Фильм Кристофера Нолана «Интерстеллар» многие называют самым
								научным в современной кинофантастике, но и претензии ему
								предъявляют по всей строгости.
							</p>
						</Link>
						<div className={styles.PostImgPreview}></div>
					</div>
					<PostDownMenu />
				</div>
			</div>
		</>
	)
}
